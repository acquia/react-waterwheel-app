import React, {PropTypes} from 'react';

const Article = ({article, user}) => (
  <article
    style={{
      width: '75vw',
      padding: '10px'
    }}>

    <h1>{article.attributes.title}</h1>
    <p>--{user.attributes.name}</p>
    <div>{article.attributes.body.value}</div>
  </article>
);

Article.propTypes = {
  article: PropTypes.object,
  user: PropTypes.object
};

export default Article;
