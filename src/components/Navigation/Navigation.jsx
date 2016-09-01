import React from 'react';
import { Link } from 'react-router';

const Navigation = () => (
  <ul>
    <li><Link to={'/'}>Home</Link></li>
    <li><Link to={'/article'}>Articles</Link></li>
  </ul>
);

export default Navigation;
