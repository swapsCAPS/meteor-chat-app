import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  Meteor.publish('chatList', function chatsPublication() {
    // TODO return all chats this user exists in
    return Chats.find({});
  });
}

Meteor.methods({
  'chats.setUserTyping'(uid) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // TODO Set the member with uid to typing true
    Chats.update();
  }
});
