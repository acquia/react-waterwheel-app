import React from 'react';
import Navigation from '../lib/Navigation.jsx';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="page">
        <section className="navigation"><Navigation key="navigation" /></section>
        <section className="body">{this.props.children}</section>
      </section>
    );
  }
}

App.propTypes = { children: React.PropTypes.element.isRequired };

export default App;
