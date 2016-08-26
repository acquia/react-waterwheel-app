import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import './Index.css';

const config = require('../../config');
const Waterwheel = require('waterwheel');

import Placeholder from '../Lib/Placeholder.jsx';

const ArticleFragment = ({ article }) => (
  <article key={article.id} className="articleFragment">
    <header>
      <h1><Link to={`/article/${article.id}`}>{article.attributes.title}</Link></h1>
    </header>
    <section>
      <p>Published: {moment.unix(article.attributes.created).format('dddd, MMMM Do YYYY')}</p>
    </section>
  </article>
);

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drupalData: {}, isLoading: true };
    this.waterwheel = new Waterwheel(config.waterwheel.base, config.waterwheel.credentials);
  }
  fetchData() {
    this.waterwheel.jsonapi.get('node/article', {})
      .then(res => this.setState({ drupalData: res.data }))
      .then(() => this.setState({ isLoading: false }));
  }
  componentWillMount() {
    this.fetchData();
  }
  render() {
    return this.state.isLoading ? <Placeholder /> : (
      <div>
        {this.state.drupalData.map((article, index) => (
          <ArticleFragment key={index} article={article} />
        ))}
      </div>
    );
  }
}

export default Index;
