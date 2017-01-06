import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../imports/ui/containers/App';
import NotFound from '../imports/ui/components/NotFound';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ App } />
        <Route path="*" component={ NotFound }/>
      </Route>
    </Router>,
    document.getElementById('render-target'));
});
