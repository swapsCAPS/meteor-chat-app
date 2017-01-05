import React, { Component } from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

import './AccountsUIWrapper.sass';

const centerVertical = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
};
const centerHorizontal = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
};

export default class AccountsUIWrapper extends Component {

  render() {
    return ( 
      <div style={ centerVertical }>
        <div className="login-form-wrapper" style={ centerHorizontal }>
          <Accounts.ui.LoginForm formState={STATES.SIGN_IN} />
        </div>
      </div>
    );
  }
}
