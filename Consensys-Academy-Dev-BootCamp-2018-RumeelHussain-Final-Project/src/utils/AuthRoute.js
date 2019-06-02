
import React from "react";
import {Route,Redirect} from "react-router-dom";
import Auth from './Auth';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/home",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);