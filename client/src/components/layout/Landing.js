import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }


  render(){
    return(
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Developer Connector</h1>
            <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
            <div className="buttons">
              <Link className="btn btn-primary" to="/register">Sign Up</Link>
              <Link className="btn btn-light" to="/login">Login</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing);
