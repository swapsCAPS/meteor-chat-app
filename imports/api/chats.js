import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
  Meteor.publish('chats', function chatsPublication() {
    return Chats.find( { members: this.userId } );
  });
}

Meteor.methods({
  'chats.new'(otherUsersId) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
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
