import React, { useContext } from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

import { CurrentUserContext } from '../CurrentUserContext';
import routes from '../routes';

export default function PrivateRoute({ children, component: Component, ...rest }: RouteProps) {
  const { currentUser, loading } = useContext(CurrentUserContext);

  if (!loading && !currentUser?.id) {
    return (
      <Redirect
        to={{
          pathname: routes.login,
        }}
      />
    );
  }

  return <Route {...rest} render={(props) => (Component ? <Component {...props} /> : children)} />;
}
