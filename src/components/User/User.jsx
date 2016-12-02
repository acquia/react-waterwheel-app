import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Error from '../Lib/Error.jsx';
import Placeholder from '../Lib/Placeholder.jsx';

const config = require('../../config');
const Waterwheel = require('waterwheel');

const UserFull = ({ user }) => (
  <article key={article.id} className="full">
    <header>
      <h1 className="title">{article.title[0].value}</h1>
      <p className="user">Author - <Link to={`/user/${user.uid[0].value}`}>{user.name[0].value}</Link></p>
    </header>
    <section>
      <div dangerouslySetInnerHTML={{ __html: article.body[0].value }} />
    </section>

  </article>
);

UserFull.propTypes = {
  article: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: false, isLoading: true };
    this.waterwheel = new Waterwheel({ base: config.waterwheel.base, credentials: config.waterwheel.credentials });
  }
  fetchUser(userID) {
    this.waterwheel.issueRequest('GET', `user/${userID}?_format=hal_json`)
      .then(res => this.setState({ user: res }))
      .then(() => this.setState({ isLoading: false }))
      .catch(err => {
        this.setState({ error: true, message: err });
        this.setState({ isLoading: false });
      });
  }
  componentWillMount() {
    this.fetchUser(this.props.params.userID);
  }
  render() {
    return (
      this.state.isLoading ? <Placeholder /> :
        (this.state.error ? <Error /> : <UserFull
          key={this.state.article.uuid[0].value}
          user={this.state.user}
        />)
    );
  }
}

User.propTypes = {
  params: PropTypes.shape({
    userID: PropTypes.string.isRequired
  })
};

export default User;
