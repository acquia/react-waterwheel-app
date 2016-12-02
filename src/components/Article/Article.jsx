import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Error from '../Lib/Error.jsx';
import Placeholder from '../Lib/Placeholder.jsx';
import ArticleHelper from './ArticleHelper.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: false,
      isLoading: true,
      inEditUUIDs: new Set()
    };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });
    this.inEditUUIDManagement = this.inEditUUIDManagement.bind(this);

    if (this.props.params.inEditUUIDs) {
      this.props.params.inEditUUIDs.split(',').forEach(uuid => this.state.inEditUUIDs.add(uuid));
    }
  }
  fetchArticleList() {
    this.waterwheel.jsonapi.get('node/article', { include: 'uid' })
      .then(res => this.setState({ articleList: res.data, includes: res.included }))
      .then(() => this.setState({ isLoading: false }))
      .catch(err => {
        this.setState({ error: true, message: err });
        this.setState({ isLoading: false });
      });
  }
  componentWillMount() {
    this.fetchArticleList();
  }
  inEditUUIDManagement(action, uuid) {
    console.log('action, uuid', action, uuid);
    this.state.inEditUUIDs[action](uuid);
    console.log(this.state.inEditUUIDs, this.state.inEditUUIDs.size);
    const uuidArray = Array.from(this.state.inEditUUIDs);
    browserHistory.push(uuidArray.length ? `/article/${uuidArray.join(',')}/edit` : '/article');
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      inEditUUIDs: new Set([].concat(...[(nextProps.params.inEditUUIDs || '').split(',')]))
    });
  }
  render() {
    return (
      this.state.isLoading ? <Placeholder /> :
        (this.state.error ?
          <Error /> :
          <section className="articleList">
            {this.state.articleList.map(article => (
              <ArticleHelper
                article={article}
                user={this.state.includes.filter(user => user.data.id === article.relationships.uid.data.id)[0].data}
                key={article.id}
                inEditUUIDManagement={this.inEditUUIDManagement}
                inEditUUIDs={Array.from(this.state.inEditUUIDs)}
              />
            ))}
          </section>
        )
    );
  }
}

Article.propTypes = {
  params: PropTypes.shape({
    inEditUUIDs: PropTypes.string
  })
};

export default Article;
