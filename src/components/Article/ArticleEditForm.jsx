import moment from 'moment';

import React, { PropTypes } from 'react';
import update from 'immutability-helper';

import Error from '../Lib/Error.jsx';
import Placeholder from '../Lib/Placeholder.jsx';

import { Form, FormField, FormInput, Button, Checkbox, Col, Card, Row } from 'elemental';

import {
    set
} from 'lodash';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class ArticleEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
      user: this.props.user,
      isLoading: true,
      formKeys: {}
    };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const formObject = {};
    formObject[event.target.dataset.jsonapikey] = { $set: event.target.value };
    this.setState(previousState => update(previousState, {
      formKeys: formObject
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
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
    this.waterwheel.jsonapi.patch(
      `node/article/${this.state.article.id}`,
      submitObject
    )
    .then(() => {
      this.props.editModeHandler();
    })
  }
  render() {
    return (
      <Row>
        <Col xs="2/3" sm="1" md="2/3" lg="2/3">
          <Card>
            <Form onSubmit={this.handleSubmit}>
              <FormField label="Title" htmlFor={`title-${this.state.article.id}`}>
                <FormInput
                  autoFocus
                  type="text"
                  defaultValue={this.state.article.attributes.title}
                  name={`title-${this.state.article.id}`}
                  onChange={this.handleChange}
                  data-jsonapikey="attributes.title"
                />
              </FormField>
              <FormField label="Summary" htmlFor={`bodySummary-${this.state.article.id}`}>
                <FormInput
                  multiline
                  defaultValue={this.state.article.attributes.body.summary}
                  name={`bodySummary-${this.state.article.id}`}
                  onChange={this.handleChange}
                  data-jsonapikey="attributes.body.summary"
                />
              </FormField>
              <FormField label="Body" htmlFor={`body-${this.state.article.id}`}>
                <FormInput
                  multiline
                  defaultValue={this.state.article.attributes.body.value}
                  name={`body-${this.state.article.id}`}
                  onChange={this.handleChange}
                  data-jsonapikey="attributes.body.value"
                />

              </FormField>
              <FormField label="Tags" htmlFor={`tags-${this.state.article.id}`}>
                {/* <FormInput
                  defaultValue={this.state.taxonomyTags.map(tag => `${tag.data.attributes.name} (${tag.data.attributes.tid})`).join(', ')}
                  name={`tags-${this.state.article.id}`}
                  onChange={this.handleChange}
                /> */}
              </FormField>
              <Button submit>Submit</Button>
            </Form>
          </Card>
        </Col>
        <Col xs="1/3" sm="1" md="1/3" lg="1/3">
          <Card>
            <h3>Published</h3>
            <p><b>Last Saved:</b> {moment.unix(this.state.article.attributes.revision_timestamp).format('dddd, MMMM Do YYYY')}</p>
            <p><b>Author:</b> {this.state.user.attributes.name}</p>
            <p onClick={this.props.editModeHandler}>Leave edit mode</p>
          </Card>
          <Card>
            <FormField>
              <Checkbox label="Create new revision" checked onChange={this.handleChange} />
            </FormField>
            <FormField label="Revision log message" htmlFor={`revLogMessage-${this.state.article.id}`}>
              <FormInput
                multiline
                name={`revLogMessage-${this.state.article.id}`}
              />
            </FormField>
          </Card>

          <Card>
            <h3>Menu Settings</h3>
            <FormField>
              <Checkbox label="Provide a menu link" />
            </FormField>
          </Card>
        </Col>
      </Row>
    );
  }
}

ArticleEditForm.propTypes = {
  article: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  editModeHandler: PropTypes.func.isRequired
};

export default ArticleEditForm;
