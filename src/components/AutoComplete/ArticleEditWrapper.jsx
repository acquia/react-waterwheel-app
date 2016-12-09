import React, { PropTypes } from 'react';
import { Form, Input, Col, Row, Button, notification } from 'antd';
import { set } from 'lodash';
import update from 'immutability-helper';

import TagEditor from './TagEditor.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

import './ArticleEditWrapper.css';

class ArticleEditWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      formKeys: {}
    };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });

    this.handleFormItemChange = this.handleFormItemChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setSubmitState = this.setSubmitState.bind(this);

    this.get = this.get.bind(this);
  }
  get() {
    Promise.all([
      this.waterwheel.jsonapi.get('taxonomy_term/tags', {}),
      this.waterwheel.jsonapi.get('node/article', { include: 'uid,field_image,field_tags' }, this.props.params.uuid)
    ])
      .then(res => {
        this.setState({
          hasLoaded: true,
          article: res[1].data,
          availableTags: res[0].data,
          user: res[1].included.filter(include => include.data.type === 'user--user'),
          tags: res[1].included.filter(include => include.data.type === 'taxonomy_term--tags'),
          tagTIDs: res[1].included.filter(include => include.data.type === 'taxonomy_term--tags').map(tag => tag.data.attributes.tid),
          submitButtonIsDisabled: true
        });
      });
  }
  componentWillMount() {
    this.get();
  }
  setSubmitState(key, value) {
    const formObject = {};
    formObject[key] = { $set: value };
    this.setState(previousState => update(previousState, {
      formKeys: formObject,
      submitButtonIsDisabled: { $set: false }
    }));
  }
  handleFormItemChange(event) {
    event.preventDefault();
    this.setSubmitState(event.target.dataset.jsonapikey, event.target.value);
  }
  handleFormSubmit(event) {
    event.preventDefault();

    const tags = this.state.formKeys.tags || [];
    delete this.state.formKeys.tags;

    const submitObject = {
      data: {
        type: 'node--article',
        id: this.state.article.id,
        attributes: {
          nid: this.state.article.attributes.nid,
          uuid: this.state.article.id
        }
      }
    };

    Object.entries(this.state.formKeys).forEach(([key, value]) => {
      set(submitObject.data, key, value);
    });

    (Object.keys(this.state.formKeys).length ?
      this.waterwheel.jsonapi.patch(
        `node/article/${this.state.article.id}`,
        submitObject
      ) :
      Promise.resolve())
      .then(() => (tags.length ?
        this.waterwheel.jsonapi.patch(
          `node/article/${this.state.article.id}/relationships/field_tags`,
          {
            data: tags.map(tid => ({ type: 'taxonomy_term--tags', id: tid }))
          }
        ) :
        Promise.resolve()
      ))
      .then(() => {
        notification.success({
          message: 'Saved!',
          description: 'This article has been saved.',
        });
        this.get();
      })
      .catch(err => {
        notification.error({
          message: 'Error!',
          description: `${err}`,
        });
      });
  }
  render() {
    return (
      <Form horizontal onSubmit={this.handleFormSubmit}>
        {this.state.hasLoaded &&
          <Row>
            <Col lg={{ span: 17, offset: 0 }}>
              <Row>
                <Form.Item
                  label="Title"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 18 }}
                  required={true}
                >
                  <Input
                    defaultValue={this.state.article.attributes.title}
                    onChange={this.handleFormItemChange}
                    data-jsonapikey="attributes.title"
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item
                  label="Summary"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 18 }}
                  help="Leave blank to use trimmed value of full text as the summary."
                >
                  <Input
                    type="textarea"
                    defaultValue={this.state.article.attributes.body.summary}
                    autosize={{ minRows: 2, maxRows: 10 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Body"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 18 }}
                >
                  <Input
                    type="textarea"
                    defaultValue={this.state.article.attributes.body.value}
                    autosize={{ minRows: 2, maxRows: 20 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Tags"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 18 }}
                  help="Enter a comma-separated list. For example: Amsterdam, Mexico City, 'Cleveland, Ohio'"
                >
                  <TagEditor
                    availableTags={this.state.availableTags}
                    initialTags={this.state.tags.map(tag => tag.data.attributes.tid)}
                    tagStateHandler={this.setSubmitState}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={this.state.submitButtonIsDisabled}>Submit</Button>
                </Form.Item>
              </Row>
            </Col>
            <Col lg={{ span: 4, offset: 1 }}>
            </Col>
          </Row>
        }
      </Form>
    );
  }
}

ArticleEditWrapper.propTypes = {
  params: PropTypes.shape({
    uuid: PropTypes.string.isRequired
  })
};

export default ArticleEditWrapper;
