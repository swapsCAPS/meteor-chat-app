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
    });
  },
  'chats.setUserTyping'(chatId) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Chats.update(chatId, {});
  },
});
