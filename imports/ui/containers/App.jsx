import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../containers/AccountsUIWrapper';
import MessagesList from '../containers/MessagesList';
import TextInput from '../components/TextInput';

export class App extends Component {
  componentDidMount(){
    console.log('w00t we have react');
  }

  render() {
    return (
      <div className="container">
        { 
          this.props.currentUser ? 
            <div>
              <header>
                <h1>Chat App</h1>
              </header>
              <MessagesList />
              <TextInput />
            </div>
            : <AccountsUIWrapper /> 
        }
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  };
}, App);
