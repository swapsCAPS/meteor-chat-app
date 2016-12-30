import React, { Component } from 'react';

import Messages from '../containers/Messages'
import TextInput from '../components/TextInput'

export default class App extends Component {
  componentDidMount(){
    console.log('w00t we have react')
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Chat App</h1>
          <Messages />
          <TextInput />
        </header>
      </div>
    );
  }
}
