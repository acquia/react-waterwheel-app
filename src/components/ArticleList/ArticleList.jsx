import React from 'react';
import Error from '../Lib/Error.jsx';
import Placeholder from '../Lib/Placeholder.jsx';
import ArticleFragment from './ArticleFragment.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articleList: false, isLoading: true };
    this.waterwheel = new Waterwheel(config.waterwheel.base, config.waterwheel.credentials);
  }
  fetchArticleList() {
    this.waterwheel.jsonapi.get('node/article', {})
      .then(res => this.setState({ articleList: res.data }))
      .then(() => this.setState({ isLoading: false }))
      .catch(err => {
        this.setState({ error: true, message: err });
        this.setState({ isLoading: false });
      });
  }
  componentWillMount() {
    this.fetchArticleList();
  }
  render() {
    return (
      this.state.isLoading ? <Placeholder /> :
        (this.state.error ? <Error /> : <ArticleFragment articleList={this.state.articleList} />)
    );
  }
}

export default Article;
