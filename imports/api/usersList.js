import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.publish('usersList', function usersPublication() {
    return Meteor.users.find({}, { fields: { 'username': 1} });
  });
}

Meteor.methods({
});
