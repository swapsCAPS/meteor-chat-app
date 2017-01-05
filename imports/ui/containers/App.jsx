import React, { Component, PropTypes } from 'react';
import Tracker from 'tracker-component';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

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

  constructor(props) {
    super(props);
    this.autorun(() => {
      this.setState({
        isAuthenticated: Meteor.user()
      });
    });
  }

  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!this.state.isAuthenticated) {
      browserHistory.push('/signin');
    }
  }

  componentDidUpdate() {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!this.state.isAuthenticated) {
      browserHistory.push('/signin');
    }
  }

  componentDidMount(){
    console.log('w00t we have react');
  }

  setCurrentChatId(id) {
    this.setState( { currentChatId: id } );
    // Set latest chat so we can render it on app start
    // TODO TODO
  }

  render() {
    return (
      <div className="container">
        <div className="side-bar">
          <ChatsList currentChatId={ this.state.currentChatId } setChatId={ this.setCurrentChatId.bind(this) }/>
          <UsersList setChatId={ this.setCurrentChatId.bind(this) }/>
        </div>
        <ChatView currentChatId={ this.state.currentChatId }/>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);
