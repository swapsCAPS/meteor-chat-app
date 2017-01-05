import { Accounts } from 'meteor/std:accounts-basic';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
  homeRoutePath: '/',
  loginPath: '/',
  minimumPasswordLength: 6
});
