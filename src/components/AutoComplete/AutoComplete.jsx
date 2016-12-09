import React from 'react';
import { Col, Row, TreeSelect, Card } from 'antd';

import TableListing from './TableListing.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class TagAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      values: [],
      selectedEntityIDs: []
    };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });
    this.onChange = this.onChange.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleDeletes = this.handleDeletes.bind(this);
  }
  handleRowSelection(selectedRowKeys) {
    this.setState({ selectedEntityIDs: selectedRowKeys });
  }
  componentWillMount() {
    Promise.all([
      this.waterwheel.jsonapi.get('taxonomy_term/tags', {}),
      this.waterwheel.jsonapi.get('node/article', { include: 'uid' })
    ])
      .then(res => {
        this.setState({
          availableTags: res[0].data.map(tag => ({
            label: tag.attributes.name,
            value: tag.attributes.uuid
          })),
          availableArticles: res[1].data,
          renderedArticles: res[1].data,
          users: res[1].included,
          hasLoaded: true
        });
      });
  }
  onChange(selectedTags) {
    this.setState({
      renderedArticles: selectedTags.length ? this.state.availableArticles.filter(article => selectedTags.some(selectedTagId => article.relationships.field_tags.data.map(tag => tag.id).includes(selectedTagId))) : this.state.availableArticles
    });
  }
  handleDeletes(e) {
    e.preventDefault();
    console.log(this.state.selectedEntityIDs);
  }
  render() {
    return (
      <section>
        {this.state.hasLoaded &&
          <Row>
            <Col lg={{ span: 4, offset: 0 }}>
              <Card title="Operations" style={{ width: '100%' }}>
                <a href="#" onClick={this.handleDeletes}>Delete?</a>
              </Card>
              <Card title="Filter by Tags" style={{ width: '100%' }}>
                <TreeSelect
                  treeData={this.state.availableTags}
                  style={{ width: '100%' }}
                  onChange={this.onChange}
                  multiple={true}
                />
              </Card>
            </Col>
            <Col lg={{ span: 18, offset: 1 }}>
              {this.state.renderedArticles.length &&
                <TableListing
                  articles={this.state.renderedArticles}
                  users={this.state.users}
                  handleRowSelection={this.handleRowSelection}
                />
              }
            </Col>
          </Row>
        }
      </section>
    );
  }
}

export default TagAutoComplete;
