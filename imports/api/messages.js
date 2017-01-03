import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication(chatId) {
    // TODO check if this user is in this chat
    return Messages.find( { chatId: chatId } );
  });
}

Meteor.methods({
  'messages.insert'(text, chatId) {
    check(text, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // TODO check if the user is in this chat!

    Messages.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      chatId: chatId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});
