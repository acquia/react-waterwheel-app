import React, { PropTypes } from 'react';

import { TreeSelect } from 'antd';

class TagEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTags: this.props.availableTags.map(tag => ({
        label: tag.attributes.name,
        value: tag.attributes.tid
      })),
      initialTags: this.props.initialTags
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(values) {
    this.setState({ initialTags: values });
    this.props.tagStateHandler('tags', values);
  }
  render() {
    return (
      <TreeSelect
        treeData={this.state.availableTags}
        value={this.state.initialTags}
        style={{ width: '100%' }}
        multiple={true}
        onChange={this.onChange}
      />
    );
  }
}

TagEditor.propTypes = {
  availableTags: PropTypes.array.isRequired,
  initialTags: PropTypes.array.isRequired,
  tagStateHandler: PropTypes.func.isRequired
};

export default TagEditor;
