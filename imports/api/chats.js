import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  /*
   * Publish all chats where this user is a member
   */
  Meteor.publish('chats', function chatsPublication() {
    if(!this.userId) return;
    return Chats.find( { 'members._id': this.userId } );
  });

  /*
   * We do this server side only because mini mongo does not support #elemMatch inside $all
   * It will fall back to server only anyway, and will otherwise error in the browser console
   */
  Meteor.methods({
     // Create a new chat between this.user and another user
    'chats.new'(otherUsersId) {
      check(otherUsersId, String);
      if(!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      if(!this.userId === otherUsersId) {
        throw new Meteor.Error('chatting with yourself... feeling lonely?');
      }

      // Check if this document already exists. (NOTE this may be an expensive operation)
      const chat = Chats.findOne({
        'members': {
          '$size': 2, '$all': [
            { '$elemMatch': { _id: this.userId } }, 
            { '$elemMatch': { _id: otherUsersId } }
          ]
        }
      });
      if(chat) {
        // A chat with these users already exists, return the id so we can render it client side
        return chat._id;
      }
      // This chat does not exist yet, insert it. And return the id so we can render it
      return Chats.insert({
        createdAt: new Date(),
        owner: Meteor.userId(),
        members: [
          { _id: Meteor.userId(), isTyping: false }, 
          { _id: otherUsersId, isTyping: false }
        ],
      });
    },
  });
}

Meteor.methods({
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
