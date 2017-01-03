import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  Meteor.publish('chats', function chatsPublication() {
    if(!this.userId) return;
    return Chats.find( { members: this.userId } );
  });
  Meteor.publish('singleChat', function singleChatPublication(chatId) {
    if(!this.userId || !chatId) return;
    // TODO check security measures
    if(Chats.findOne(chatId).members.indexOf(this.userId) === -1) {
      throw new Meteor.Error('not-authorized');
    }
    return Chats.find({ chatId: chatId });
  });
}

Meteor.methods({
  'chats.new'(otherUsersId) {
    check(otherUsersId, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // NOTE this may be an expensive operation
    // Check if this document already exists
    const chat = Chats.findOne({ members: { '$size': 2, '$all': [this.userId, otherUsersId] } });
    if(chat) {
      // A chat with these users already exists, return the id so we can render it, client side
      return chat._id;
    }
    // This chat does not exist yet, insert it. And return the id so we can render it
    return Chats.insert({
      createdAt: new Date(),
      owner: Meteor.userId(),
      members: [ Meteor.userId(), otherUsersId ],
      lastActive: [ 0, 0 ]
    });
  },
  'chats.setMemberTyping'(chatId, newTimestamp) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if(Chats.findOne(chatId).members.indexOf(this.userId) === -1) {
      throw new Meteor.Error('not-authorized');
    }
    // This can propably lead to race conditions when multiple users are typing...
    // TODO only update once every 2-5 seconds to give some time
    // Man this is fugly TODO find better way of doing this...
    const chat = Chats.findOne(chatId);
    const indexOfTyper = chat.members.indexOf(this.userId);
    const lastActiveArr = chat.lastActive.map((oldTimestamp, arrayIndex) => {
      if(arrayIndex === indexOfTyper) return newTimestamp;
      return oldTimestamp;
    });
    Chats.update({ _id: chatId }, { '$set': { lastActive: lastActiveArr } });
  },
});
