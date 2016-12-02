import React, { PropTypes } from 'react';


import ArticleEditForm from './ArticleEditForm.jsx';
import ArticleFragment from './ArticleFragment.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class ArticleHelper extends React.Component {
  constructor(props) {
    super(props);
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });

    this.publishedStateHandler = this.publishedStateHandler.bind(this);
    this.editModeHandler = this.editModeHandler.bind(this);

    this.patch = this.patch.bind(this);

    this.state = {
      published: this.props.article.attributes.status === '1',
      editMode: this.props.inEditUUIDs.includes(this.props.article.id)
    };
  }
  publishedStateHandler(event) {
    event.preventDefault();
    this.patch({
      data: {
        type: 'node--article',
        id: this.props.article.id,
        attributes: {
          nid: this.props.article.attributes.nid,
          uuid: this.props.article.id,
          status: this.state.published ? 0 : 1
        }
      }
    })
    .then(() => {
      this.setState({ published: !this.state.published });
    });
  }
  patch(data) {
    return this.waterwheel.jsonapi.patch(`node/article/${this.props.article.id}`, data);
  }
  editModeHandler() {
    this.setState({ editMode: !this.state.editMode }, () => {
      this.props.inEditUUIDManagement(this.state.editMode ? 'add' : 'delete', this.props.article.id);
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ editMode: nextProps.inEditUUIDs.includes(this.props.article.id) });
  }
  render() {
    return (
      <section>
        <ArticleFragment
          article={this.props.article}
          user={this.props.user}
          published={this.state.published}
          publishedStateHandler={this.publishedStateHandler}
          editModeHandler={this.editModeHandler}
        />
        {this.state.editMode && <ArticleEditForm
          article={this.props.article}
          user={this.props.user}
          editModeHandler={this.editModeHandler}
        /> }
      </section>
    );
  }
}

ArticleHelper.propTypes = {
  article: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  inEditUUIDManagement: PropTypes.func.isRequired,
  inEditUUIDs: PropTypes.array.isRequired
};

export default ArticleHelper;
