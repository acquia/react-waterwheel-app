import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

App.propTypes = { children: React.PropTypes.element.isRequired };

export default App;
