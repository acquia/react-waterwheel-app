import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App/App.jsx';
import Index from './components/Index/Index.jsx';

import Article from './components/Article/Article.jsx';

import DynamicForm from './components/DynamicForm/DynamicForm.jsx';
import AutoComplete from './components/AutoComplete/AutoComplete.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/article" component={Article} />
      <Route path="/article(/:inEditUUIDs/edit)" component={Article} />
      <Route path="/formtests" component={DynamicForm} />
      <Route path="/autocomplete" component={AutoComplete} />
    </Route>
  </Router>
), document.getElementById('app'));
