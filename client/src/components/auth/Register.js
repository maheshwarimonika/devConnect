import React, { Fragment, Component, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { setAlert } from '../../actions/alert';
import TextFieldGroup from '../common/TextFieldGroup';

const Register = ({ setAlert }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault();
    if(password != password2){
      setAlert('Passwords do not match','danger')
    } else{
      register({ name, email, password })
    }
  }

  return(
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" noValidate onSubmit={e => onSubmit(e)}>
          <TextFieldGroup
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />

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

          <TextFieldGroup
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={password2}
            onChange={e => onChange(e)}
          />
        <input type="submit" className="btn btn-primary" />
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </Fragment>
  )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};


export default connect(null , { setAlert, register })(Register);
