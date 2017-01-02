import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication() {
    // TODO return messages of chats where this user belongs to
    return Messages.find();
  });
}

Meteor.methods({
  'messages.insert'(text, chatId) {
    check(text, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      chatId: chatId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});
