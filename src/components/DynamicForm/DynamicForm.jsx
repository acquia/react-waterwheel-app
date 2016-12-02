import React from 'react';

import { Form, Row } from 'elemental';
import EntityFields from './EntityFields.jsx';
import BundleFields from './BundleFields.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

const DynamicForm = class DynamicForm extends React.Component {
  constructor(props) {
    super(props);
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });
    this.state = { loaded: false };
  }
  get() {
    Promise.all([
      this.waterwheel.jsonapi.get('node/article', { include: 'uid' }, 'cc91c2bf-6306-4ab3-8be7-aebcf3b59466'),
      this.waterwheel.issueRequest('GET', 'water-wheel/swagger/entities?_format=json')
    ])
      .then(res => {
        // Bundle Fields
        const arr1 = Object.keys(res[1].definitions['node:article'].allOf[1].properties);
        // Entity Fields
        const arr2 = Object.keys(res[1].definitions.node.properties);

        // Keys that only exist in the bundle.
        const difference = arr1.filter(field => !~arr2.indexOf(field));

        // Setup a place to store the bundle only field data. Only store the data if we've
        // actually got a matching key in the JSON API response.
        const nonBaseFields = {};
        difference.forEach(field => {
          if (res[0].data.attributes[field]) {
            nonBaseFields[field] = res[0].data.attributes[field];
          }
        });

        // Setup a place to store the entity only field data. Only store the data if we've
        // actually got a matching key in the JSON API response.
        const baseFields = {};
        arr1.filter(x => !~difference.indexOf(x)).forEach(field => {
          if (res[0].data.attributes[field]) {
            baseFields[field] = res[0].data.attributes[field];
          }
        });

        this.setState({
          article: res[0],
          user: res[0].included[0].data,
          swagger: res[1],
          loaded: true,
          bundleFields: { ...nonBaseFields },
          entityFields: { ...baseFields }
        });
      });
  }
  componentWillMount() {
    this.get();
  }
  render() {
    return (
      <section>
        <Form>
          {this.state.loaded &&
            <Row>
              <BundleFields bundleFields={this.state.bundleFields} user={this.state.user} />
              <EntityFields entityFields={this.state.entityFields} user={this.state.user} />
            </Row>
          }
        </Form>
      </section>
    );
  }
};

export default DynamicForm;
