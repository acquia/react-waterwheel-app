import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import './PageFragment.css';

const PageFragment = ({ pageList }) => (
  <div>
  {pageList.map(page => (
    <article key={page.id} className="pageFragment">
      <header>
        <h1><Link to={`/page/${page.id}`}>{page.attributes.title}</Link></h1>
      </header>
      <section>
        <p>Published: {moment.unix(page.attributes.created).format('dddd, MMMM Do YYYY')}</p>
      </section>
    </article>
  ))}
  </div>
);

PageFragment.propTypes = {
  pageList: PropTypes.array.isRequired
};

export default PageFragment;
