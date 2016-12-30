import React, { Component, PropTypes } from 'react';

import MessagesList from '../containers/MessagesList';
import TextInput from '../components/TextInput';

export default class App extends Component {
  componentDidMount(){
    console.log('w00t we have react');
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Chat App</h1>
          <MessagesList />
          <TextInput />
        </header>
      </div>
    );
  }
}
