import React from 'react';
import Error from '../Lib/Error.jsx';
import Placeholder from '../Lib/Placeholder.jsx';
import PageFragment from './PageFragment.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageList: false, isLoading: true };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });
  }
  fetchPageList() {
    this.waterwheel.jsonapi.get('node/page', {})
      .then(res => this.setState({ pageList: res.data }))
      .then(() => this.setState({ isLoading: false }))
      .catch(err => {
        this.setState({ error: true, message: err });
        this.setState({ isLoading: false });
      });
  }
  componentWillMount() {
    this.fetchPageList();
  }
  render() {
    return (
      this.state.isLoading ? <Placeholder /> :
        (this.state.error ? <Error /> : <PageFragment articleList={this.state.pageList} />)
    );
  }
}

export default Page;
