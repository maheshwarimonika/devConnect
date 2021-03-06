import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import setAuthToken from '../utils/setAuthToken';


//Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err){

    dispatch({
      type: AUTH_ERROR
    })
  }
}

//Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers : {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
}


//Login User
export const register = (email, password) => async dispatch => {
  const config = {
    headers : {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch(err) {
    const errors = err.response.data.errors;

    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
}

//Set Logged in user
export const setCurrentUser = decoded => {
  /*return {
    type: SET_CURRENT_USER,
    payload: decoded
  }*/
}

//Log user out
export const logoutUser = () => dispatch => {

  localStorage.removeItem('jwtToken')
  //setAuthToken(false);
  //dispatch(setCurrentUser({}))

}
