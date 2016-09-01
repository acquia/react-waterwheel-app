import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import './ArticleFragment.css';

const ArticleFragment = ({ articleList }) => (
  <div>
  {articleList.map(article => (
    <article key={article.id} className="articleFragment">
      <header>
        <h1><Link to={`/article/${article.id}`}>{article.attributes.title}</Link></h1>
      </header>
      <section>
        <p>Published: {moment.unix(article.attributes.created).format('dddd, MMMM Do YYYY')}</p>
      </section>
    </article>
  ))}
  </div>
);

export default ArticleFragment;
