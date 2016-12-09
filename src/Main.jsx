import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App/App.jsx';
import Index from './components/Index/Index.jsx';

import AutoComplete from './components/AutoComplete/AutoComplete.jsx';
import ArticleEditWrapper from './components/AutoComplete/ArticleEditWrapper.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/article" component={AutoComplete} />
      <Route path="/edit/(:uuid)" component={ArticleEditWrapper} />
    </Route>
  </Router>
), document.getElementById('app'));
