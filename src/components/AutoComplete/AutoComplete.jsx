import React from 'react';

import { AutoComplete, Row, Col } from 'antd';
import './autocomplete.css';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class TagAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasLoaded: false };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });
  }
  componentWillMount(){
    this.waterwheel.jsonapi.get('taxonomy_term/tags', {})
      .then(res => this.setState({
        tags: res.data.map(tag => tag.attributes.name),
        hasLoaded: true
      }));
  }
  handleChange(value) {

  }
  render() {
    return (
      <Row>
        {this.state.hasLoaded && <AutoComplete
          dataSource={this.state.tags}
          style={{ width: 200 }}
          onChange={this.handleChange}
        />}
      </Row>
    );
  }
}

export default TagAutoComplete;
