//standard way to create a private route component in react

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
//since we are creating a route
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //pass anything else that is passed in the component using the rest operator ie. ...rest
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest} //any extra props that are passed in
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
          //whatever extra props are in the component
        )
      }
    />
  );
};

export default PrivateRoute;
