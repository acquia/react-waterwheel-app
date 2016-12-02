import React from 'react';

import { FormField, FormInput, Col, Card } from 'elemental';

import { Editor, EditorState, ContentState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html'

const Body = class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(this.props.body.value))
    };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  render() {
    return (
      <Card>
        <FormField label="Summary">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </FormField>
        <FormField label="Body">
          {/* <FormInput
            multiline
            defaultValue={this.state.body.value}
          /> */}
        </FormField>
      </Card>
    );
  }
};

const BundleFields = class BundleFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
  }
  render() {
    return (
      <Col xs="1" sm="1" md="2/3" lg="2/3">
        {this.state.bundleFields.body && <Body body={this.state.bundleFields.body} />}

      </Col>
    );
  }
};

export default BundleFields;
