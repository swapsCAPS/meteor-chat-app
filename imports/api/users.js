import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Chats } from './chats';

if (Meteor.isServer) {
  Meteor.publish('users', function usersPublication() {
    return Meteor.users.find({}, { fields: { 'username': 1, 'mostRecentChat': 1 } });
  });
}

Meteor.methods({
  'users.setMostRecentChat'(chatId) {
    check(chatId, String);
    // User logged in?
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    // User a member of this chat?
    if(!Chats.findOne( { _id: chatId, 'members._id': this.userId } )){
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(this.userId, { $set: { mostRecentChat: chatId } });
  }, 
});
