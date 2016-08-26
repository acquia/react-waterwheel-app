import React from 'react';
import Placeholder from '../Lib/Placeholder.jsx';

import './Article.css';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drupalData: {}, isLoading: true };
    this.waterwheel = new Waterwheel(config.waterwheel.base, config.waterwheel.credentials);
  }
  fetchData(articleID) {
    this.waterwheel.jsonapi.get('node/article', {}, articleID)
      .then(res => this.setState({ drupalData: res }))
      .then(() => this.setState({ isLoading: false }));
  }
  componentWillMount() {
    this.fetchData(this.props.params.articleID);
  }
  render() {
    return this.state.isLoading ? <Placeholder /> : (
      <article key={this.state.drupalData.data.id} className="full">
        <header>
          <h1 className="title">{this.state.drupalData.data.attributes.title}</h1>
        </header>
        <section>
          <div dangerouslySetInnerHTML={{ __html: this.state.drupalData.data.attributes.body.value }} />
        </section>

      </article>
    );
  }
}

export default Article;
