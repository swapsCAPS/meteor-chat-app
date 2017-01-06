import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Chats } from './chats';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication(chatId) {
    // Publish all the messages with this chat id
    if(!this.userId || !chatId) return;
    // Check if the user is in this chat
    if(!Chats.findOne( { _id: chatId, 'members._id': this.userId } )) {
      throw new Meteor.Error('not-authorized');
    }
    return Messages.find( { chatId: chatId } );
  });
}

Meteor.methods({
  'messages.insert'(text, chatId) {
    check(text, String);
    check(chatId, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // Check if the user is in this chat
    if(!Chats.findOne( { _id: chatId, 'members._id': this.userId } )) {
      throw new Meteor.Error('not-authorized');
    }

    // Insert a message
    Messages.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      chatId: chatId,
      username: Meteor.users.findOne(this.userId).username,
      readBy: [],
    });
    // Also set last message in Chat
    Chats.update(chatId, { $set: { lastMsgText: text } });
  },
  'messages.setRead'(messageId) {
    check(messageId, String);
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // Check if the user is in this message's chat
    const chatId = Messages.findOne(messageId).chatId;
    if(!Chats.findOne( { _id: chatId, 'members._id': this.userId } )) {
      throw new Meteor.Error('not-authorized');
    }

    // Add user to the readBy array if it is not in it
    Messages.update({ _id: messageId }, { '$addToSet': { readBy: this.userId } });
  },
});
