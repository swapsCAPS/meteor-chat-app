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

    // Find chat where both users are present TODO fix for more than 2 members
    const chat = Chats.findOne({ members: Meteor.userId, members: otherUsersId });
    if(chat) {
      console.log('chat exists: %s', chat._id);
      return;
    }
    Chats.insert({
      createdAt: new Date(),
      owner: Meteor.userId(),
      members: [ Meteor.userId(), otherUsersId ],
    });
  },
  'chats.setUserTyping'(uid) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // TODO Set the member with uid to typing true
    Chats.update();
  },
});
