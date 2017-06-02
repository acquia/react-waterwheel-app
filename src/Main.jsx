import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {
  Root,
  Body,
  Sidebar,
  SidebarItem
} from './Components.jsx';
import Article from './Article.jsx';
import User from './User.jsx';

import Config from './config';

const Waterwheel = require('waterwheel');

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.waterwheel = new Waterwheel(Config);
  }
  componentWillMount() {
    this.waterwheel.jsonapi.get('node/article', {include: 'uid'})
      .then(res => this.setState({articles: res.data, users: res.included}))
      .catch(console.log);
  }
  render() {
    return (
      <Router>
        <Root>
          <Sidebar>
            {this.state.articles && this.state.articles.map(article => (
              <SidebarItem key={article.id}>
                <Link to={`/a/${article.id}`}>{article.attributes.title}</Link>
              </SidebarItem>
            ))}
          </Sidebar>
          {this.state.articles &&
            <Body>
              <Route
                path="/a/:articleID"
                render={({match}) => {
                  let article = this.state.articles.find(article => article.id === match.params.articleID);
                  return (<Article
                    article={article}
                    user={this.state.users.find(user => user.id === article.relationships.uid.data.id)}
                  />);
                }}/>
              <Route
                path="/u/:userID"
                render={({match}) => {
                  return (<User
                    user={this.state.users.find(user => user.id === match.params.userID)}
                    articles={this.state.articles.filter(article => article.relationships.uid.data.id === match.params.userID)}
                  />);
                }}
              />
            </Body>
          }
        </Root>
      </Router>
    );
  }
}

render(<Index/>,
  document.getElementById('app'));
