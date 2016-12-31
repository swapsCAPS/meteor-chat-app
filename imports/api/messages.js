import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find();
  });

  Meteor.publish('userList', function usersPublication() {
    return Meteor.users.find({}, {fields: {emails: 1}});
  });
}

Meteor.methods({
  'messages.insert'(text) {
    check(text, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'users.setTyping'() {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(this.userId, {
      $set: {
        isTyping: true
      }
    });

  }

});
