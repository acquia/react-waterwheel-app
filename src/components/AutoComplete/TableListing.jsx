import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Table, Menu, Dropdown, Icon, } from 'antd';
import moment from 'moment';

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

const TableListing = ({ articles, users, handleRowSelection }) => {
  const rowSelection = {
    onChange: handleRowSelection
  };
  const dataSource = articles.map(article => ({
    key: article.id,
    title: <Link to={`/edit/${article.id}`}>{article.attributes.title}</Link>,
    contentType: article.type.split('--')[1],
    updated: moment.unix(article.attributes.changed).format('dddd, MMMM Do YYYY'),
    author: users.filter(user => user.data.id === article.relationships.uid.data.id)[0].data.attributes.name,
    operations: operationsMenu(article),
    className: 'hello-ugly-world'
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
    rowSelection={rowSelection}
    dataSource={dataSource}
    columns={columns}
    pagination={false}
    bordered={true}
  />);
};

TableListing.propTypes = {
  articles: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  handleRowSelection: PropTypes.func.isRequired
};

export default TableListing;
