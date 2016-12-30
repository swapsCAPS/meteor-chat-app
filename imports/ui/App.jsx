import React, { Component } from 'react';

export default class App extends Component {
  componentDidMount(){
    console.log('w00t we have react')
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Chat App</h1>
        </header>
      </div>
    );
  }
}
