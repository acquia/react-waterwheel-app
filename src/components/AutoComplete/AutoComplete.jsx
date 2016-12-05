import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import { Col, Row, TreeSelect, Table, Menu, Dropdown, Icon } from 'antd';
import './autocomplete.css';

const config = require('../../config');
const Waterwheel = require('waterwheel');

const operationsMenu = (article) => {
  const menu = (
    <Menu>
      <Menu.Item key="edit">
        <Link to={`/edit/${article.id}`}>Edit</Link>
      </Menu.Item>
      <Menu.Item key="delete">
        <Link to={`/delete/${article.id}`}>Delete</Link>
      </Menu.Item>
    </Menu>
  );
  const operationsButton = (
    <Dropdown
      onClick={(e) => console.log('dropdown.button onclick', e)}
      overlay={menu}
      trigger={['click']}
    >
      <a className="ant-dropdown-link" href="#">
        Operations <Icon type="down" />
      </a>
    </Dropdown>
  );
  return operationsButton;
};

const ArticleTable = ({ articles, users }) => {
  const dataSource = articles.map(article => ({
    key: article.id,
    title: article.attributes.title,
    contentType: article.type.split('--')[1],
    updated: moment.unix(article.attributes.changed).format('dddd, MMMM Do YYYY'),
    author: users.filter(user => user.data.id === article.relationships.uid.data.id)[0].data.attributes.name,
    operations: operationsMenu(article)
  }));
  const columns = [{
    title: 'TITLE',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: 'CONTENT TYPE',
    dataIndex: 'contentType',
    key: 'contentType'
  }, {
    title: 'AUTHOR',
    dataIndex: 'author',
    key: 'author'
  }, {
    title: 'UPDATE',
    dataIndex: 'updated',
    key: 'updated'
  }, {
    title: 'OPERATIONS',
    dataIndex: 'operations',
    key: 'operations'
  }];
  return (<Table
    dataSource={dataSource}
    columns={columns}
    pagination={false}
  />);
};


class TagAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      values: []
    };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });
    this.onChange = this.onChange.bind(this);
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
  render() {
    return (
      <Col>
        {this.state.hasLoaded &&
          <div>
            <Row>
              <TreeSelect
                treeData={this.state.availableTags}
                style={{ width: 300 }}
                onChange={this.onChange}
                multiple={true}
              />
            </Row>
            <Row>
              {this.state.renderedArticles.length &&
                <ArticleTable
                  articles={this.state.renderedArticles}
                  users={this.state.users}
                />
              }
            </Row>
          </div>
        }
      </Col>
    );
  }
}

export default TagAutoComplete;
