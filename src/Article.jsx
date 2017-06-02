import React from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';

const Article = ({article, user}) => (
  <article
    style={{
      width: '75vw',
      padding: '10px'
    }}>

    <h1>{article.attributes.title}</h1>
    <p>--<Link to={`/u/${user.id}`}>{user.attributes.name}</Link></p>
    <div>{article.attributes.body.value}</div>
  </article>
);

Article.propTypes = {
  article: PropTypes.object,
  user: PropTypes.object
};

export default Article;
