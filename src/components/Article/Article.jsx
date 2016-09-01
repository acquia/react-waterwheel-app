import React, { PropTypes } from 'react';
import Error from '../Lib/Error.jsx';
import Placeholder from '../Lib/Placeholder.jsx';

import './Article.css';

const config = require('../../config');
const Waterwheel = require('waterwheel');

const ArticleFull = ({ article }) => (
  <article key={article.id} className="full">
    <header>
      <h1 className="title">{article.attributes.title}</h1>
    </header>
    <section>
      <div dangerouslySetInnerHTML={{ __html: article.attributes.body.value }} />
    </section>

  </article>
);

ArticleFull.propTypes = {
  article: PropTypes.object.isRequired
};

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: false, isLoading: true };
    this.waterwheel = new Waterwheel(config.waterwheel.base, config.waterwheel.credentials);
  }
  fetchSingleArticle(articleID) {
    this.waterwheel.jsonapi.get('node/article', {}, articleID)
      .then(res => this.setState({ article: res }))
      .then(() => this.setState({ isLoading: false }))
      .catch(err => {
        this.setState({ error: true, message: err });
        this.setState({ isLoading: false });
      });
  }
  componentWillMount() {
    this.fetchSingleArticle(this.props.params.articleID);
  }
  render() {
    return (
      this.state.isLoading ? <Placeholder /> :
        (this.state.error ? <Error /> : <ArticleFull key={this.state.article.data.id} article={this.state.article.data} />)
    );
  }
}

Article.propTypes = {
  params: PropTypes.shape({
    articleID: PropTypes.string.isRequired
  })
};

export default Article;
