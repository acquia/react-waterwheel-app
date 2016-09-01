import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App/App.jsx';
import Index from './components/Index/Index.jsx';

import Article from './components/Article/Article.jsx';
import ArticleList from './components/ArticleList/ArticleList.jsx';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/article" component={ArticleList} />
      <Route path="/article/:articleID" component={Article} />
    </Route>
  </Router>
), document.getElementById('app'));
