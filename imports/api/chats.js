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
    if(!this.userId === otherUsersId) {
      throw new Meteor.Error('currentUser id is equal to otherUsersId');
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
      isTyping: [ false, false ]
    });
  },
  'chats.setMemberTyping'(chatId, newIsTyping) {
    check(chatId, String);
    check(newIsTyping, Boolean);
    // First check authorization
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if(Chats.findOne(chatId).members.indexOf(this.userId) === -1) {
      throw new Meteor.Error('not-authorized');
    }

    /*
     * This might lead to race conditions when multiple users are typing...
     * Because we get the array out of the db and then save it again
     */

    // Get the chat and the index of this typing user
    const chat = Chats.findOne(chatId);
    const indexOfTyper = chat.members.indexOf(this.userId);

    // If the value is the same do nothing
    if(chat.isTyping[indexOfTyper] === newIsTyping) return;

    // Value is not the same, get array from db, update it and save it again
    const isTypingArr = chat.isTyping.map((oldIsTyping, arrayIndex) => {
      if(arrayIndex === indexOfTyper) return newIsTyping;
      return oldIsTyping;
    });
    Chats.update({ _id: chatId }, { '$set': { isTyping: isTypingArr } });
  },
});
