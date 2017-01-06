import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  Meteor.publish('chats', function chatsPublication() {
    // Publish all chats where this user is a member
    if(!this.userId) return;
    return Chats.find( { 'members._id': this.userId } );
  });
}

Meteor.methods({
  'chats.new'(otherUsersId) {
    check(otherUsersId, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if(!this.userId === otherUsersId) {
      throw new Meteor.Error('chatting with yourself... feeling lonely?');
    }

    // NOTE this may be an expensive operation
    // Check if this document already exists
    const chat = Chats.findOne({ members: { '$size': 2, '$all': [this.userId, otherUsersId] } });
    if(chat) {
      // A chat with these users already exists, return the id so we can render it client side
      return chat._id;
    }
    // This chat does not exist yet, insert it. And return the id so we can render it
    return Chats.insert({
      createdAt: new Date(),
      owner: Meteor.userId(),
      members: [{
          _id: Meteor.userId(),
          isTyping: false
      }, {
          _id: otherUsersId,
          isTyping: false
      }],
    });
  },
  'chats.setMemberTyping'(chatId, newIsTyping) {
    check(chatId, String);
    check(newIsTyping, Boolean);
    // First check authorization
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if(!Chats.findOne( { _id: chatId, 'members._id': this.userId } )) {
      throw new Meteor.Error('not-authorized');
    }

    Chats.update(
      { _id: chatId, 'members._id': this.userId },
      { $set: { 'members.$.isTyping': newIsTyping }
    });
  },
});
