import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ auth, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
}
