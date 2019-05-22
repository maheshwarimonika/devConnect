import React, { Fragment, Component, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
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
      /*const newUser = {
        name,
        email,
        password,
        password2
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users/register', body, config);
        console.log(res.data)

      } catch (err) {
        console.log(err.response.data)
      }*/
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
/*class Register extends Component {

  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }else{

    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)

  }

  render(){

    const { errors } = this.state;

    const { user } = this.props.auth;


  }
}*/

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};


export default connect(null , { setAlert })(Register);
