import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
//import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    console.log('SUCCESS')
  }

  /*componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }

    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }*/
    return(
      <Fragment>
              <h1 className="large text-primary">Sign In</h1>
              <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
              <form className="form" onSubmit={e => onSubmit(e)}>
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => onChange(e)}
                  />

                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => onChange(e)}
                  />
                  <input type="submit" className="btn btn-primary" />
              </form>
              <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
      </Fragment>
    )
}

/*  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}*/

/*const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})*/

export default Login;
