import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

import '../imports/startup/accounts-config';
import App from '../imports/ui/containers/App';
import NotFoundView from '../imports/ui/components/NotFoundView';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/signin" component={() => <Accounts.ui.LoginForm formState={STATES.SIGN_IN} />} />
      <Route path="/" component={App}>
        <Route path="*" component={NotFoundView}/>
      </Route>
    </Router>,
    document.getElementById('render-target'));
});
