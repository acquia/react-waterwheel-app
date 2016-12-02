import React from 'react';
import moment from 'moment';
import { FormField, FormInput, Col, Card } from 'elemental';

const EntityFields = class EntityFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props };
  }
  render() {
    return (
      <Col xs="1" sm="1" md="1/3" lg="1/3">
        <Card>
          <FormField label="Title">
            <FormInput
              autoFocus
              type="text"
              defaultValue={this.state.entityFields.title}
              data-jsonapikey="attributes.title"
            />
          </FormField>
        </Card>
        <Card>
          <h3>{this.state.entityFields.status === '1' ? 'Published' : 'Unpublished'}</h3>
          <p><b>Last Saved:</b> {moment.unix(this.state.entityFields.revision_timestamp).format('dddd, MMMM Do YYYY')}</p>
          <p><b>Author</b>: {this.state.user.attributes.name}</p>
        </Card>
      </Col>
    );
  }
};

export default EntityFields;
