import React, { PropTypes } from 'react';
import moment from 'moment';
import { Form, Button, Row, Col } from 'elemental' ;

import './ArticleFragment.css';

class ArticleFragment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row className={this.props.published ? 'published' : 'unpublished'}>
        <Col sm="1/6">
          <p>{this.props.article.attributes.title}</p>
        </Col>
        <Col sm="1/6" className="initialCap">
          <p>{this.props.article.type.split('--')[1]}</p>
        </Col>
        <Col sm="1/6" className="initialCap">
          <p>{this.props.user.attributes.name}</p>
        </Col>
        <Col sm="1/6">
          <p>{this.props.published ? 'Published' : 'Unpublished'}</p>
        </Col>
        <Col sm="1/6">
          <p>{moment.unix(this.props.article.attributes.changed).format('dddd, MMMM Do YYYY')}</p>
        </Col>
        <Col sm="1/6">
          <Form onSubmit={this.props.publishedStateHandler}>
            <Button size="xs" submit>{this.props.published ? 'Unpublish' : 'Publish'}</Button>
          </Form>
          <p onClick={this.props.editModeHandler}>Edit</p>
        </Col>
      </Row>
    );
  }
}

ArticleFragment.propTypes = {
  published: PropTypes.bool.isRequired,
  article: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  publishedStateHandler: PropTypes.func.isRequired,
  editModeHandler: PropTypes.func.isRequired
};

export default ArticleFragment;
