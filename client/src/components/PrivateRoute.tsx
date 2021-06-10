import React, { useContext } from 'react';

import {
  Redirect, Route, RouteProps, useHistory,
} from 'react-router-dom';

import { CurrentUserContext } from '../CurrentUserContext';
import routes from '../routes';

export default function PrivateRoute({ children, component: Component, ...rest }: RouteProps) {
  const { currentUser, loading } = useContext(CurrentUserContext);
  const { location } = useHistory();

  if (!loading && !currentUser?.id) {
    return (
      <Redirect
        to={{
          pathname: routes.login,
          state: { from: location.pathname + location.search },
        }}
      />
    );
  }

  return <Route {...rest} render={(props) => (Component ? <Component {...props} /> : children)} />;
}
