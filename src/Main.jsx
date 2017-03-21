import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {
  Root,
  Sidebar,
  SidebarItem
} from './Components.jsx';
import Article from './Article.jsx';

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
      .then(res => (this.setState({articles: res.data, users: res.included})))
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
            <Route
              path="/a/:articleID"
              render={({match}) => {
                let article = this.state.articles.find(article => article.id === match.params.articleID);
                return (<Article
                  article={article}
                  user={this.state.users.find(user => user.id === article.relationships.uid.data.id)}
                />);
              }}/>
          }
        </Root>
      </Router>
    );
  }
}

render(<Index/>,
  document.getElementById('app'));
