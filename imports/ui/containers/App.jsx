import React, { Component, PropTypes } from 'react';
import Tracker from 'tracker-component';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../containers/AccountsUIWrapper';
import LoggedInAsHeader from '../components/LoggedInAsHeader';
import ChatsList from '../containers/ChatsList';
import UsersList from '../containers/UsersList';
import ChatView from '../containers/ChatView';
import TextInput from '../components/TextInput';
import TypingUsers from '../components/TypingUsers';

import './App.sass';

export class App extends Tracker.Component {
  state = {
    currentChatId: ''
  }

  componentDidMount(){
    console.log('w00t we have react');
  }

  componentDidUpdate(prevProps){
    if(prevProps.currentUser === this.props.currentUser) return;
    console.log('componentDidUpdate');
    this.setState( { currentChatId: this.props.currentUser.mostRecentChat } );
  }

  setCurrentChatId(id) {
    this.setState( { currentChatId: id } );
    // Set the most recent chat so we can render it on app reload
    Meteor.call('users.setMostRecentChat', id);
  }

  render() {
    // If no user, render the LoginForm from std:accounts-ui
    if(!this.props.currentUser) return <AccountsUIWrapper />;
    // All is fine, render the app
    return (
      <div className="container">
        <div className="side-bar">
          <LoggedInAsHeader username={ this.props.currentUser.username } />
          <ChatsList currentChatId={ this.state.currentChatId } setChatId={ this.setCurrentChatId.bind(this) } />
          <UsersList setChatId={ this.setCurrentChatId.bind(this) } />
        </div>
        <ChatView currentChatId={ this.state.currentChatId } />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);
