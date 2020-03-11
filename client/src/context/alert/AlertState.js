import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import uuid from 'react-uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = []; //passing in an array of alert objects

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //set alert
  const setAlert = (msg, type, timeout = 5000) => {
    //optional parameter just in case we need to pass it in for certain type of alert
    const id = uuid(); //since we have an array of alert objects, we need an id

    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        type,
        id
      }
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
