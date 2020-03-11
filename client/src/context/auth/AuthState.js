import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'), //just vanilla js to access our browser's local storage
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //load user
  const loadUser = () => console.log('load user');

  //register user
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }; //this is how we use headers with axios

    try {
      const res = await axios.post('/api/users', formData, config);
      //since we have entered a proxy value in package.json, we don't have to write
      //localhost:5000 everytime over here
      //while using it with concurrently
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      /*
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });*/
    }
  };

  //login user
  const login = () => console.log('login user');

  //logout user
  const logout = () => console.log('logout user');

  //clear errors
  const clearErrors = () => console.log('clear errors');

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
