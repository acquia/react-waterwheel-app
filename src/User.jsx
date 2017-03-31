import React, {PropTypes} from 'react';
import {
  Link
} from 'react-router-dom';

const User = ({user, articles}) => (
  <div
    style={{
      width: '75vw',
      padding: '10px'
    }}>

    <h1>{user.attributes.name}</h1>
    <h2>Articles:</h2>
    <ul>
      {articles.map(article => (
        <li key={article.id}><Link to={`/a/${article.id}`}>{article.attributes.title}</Link></li>
      ))}
    </ul>
  </div>
);

User.propTypes = {
  user: PropTypes.object,
  articles: PropTypes.array
};

export default User;
