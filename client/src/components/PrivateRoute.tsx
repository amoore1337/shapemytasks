import React, { useContext } from 'react';

import {
  Navigate, Outlet, useLocation,
} from 'react-router-dom';

import { CurrentUserContext } from '@/CurrentUserContext';
import routes from '@/routes';

import LoadingIndicator from './LoadingIndicator';

export default function PrivateRoute() {
  const { currentUser, loading } = useContext(CurrentUserContext);
  const { pathname, search } = useLocation();

  if (!loading && !currentUser?.id) {
    return (
      <Navigate
        to={routes.login}
        state={{ from: pathname + search }}
        replace
      />
    );
  }

  return loading ? <LoadingIndicator /> : <Outlet />;
}
