import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
//import classnames from 'classnames';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    //this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount() {
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
  }

  onSubmit(e){
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData)
  }

  render(){
    const { errors } = this.state;

    return(
      <Fragment>
        <div className="login">
          <div className="container">
              <h1 class="large text-primary">Sign In</h1>
              <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
              <form className="form" onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  <input type="submit" className="btn btn-primary" />
              </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
