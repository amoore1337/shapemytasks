import LoadingIndicator from '@/components/LoadingIndicator';
import { useCurrentUser } from '@/CurrentUserContext';
import routes from '@/routes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser, loading } = useCurrentUser();
  const { pathname, search } = useLocation();

  if (!loading && !currentUser?.id) {
    return <Navigate to={routes.login} state={{ from: pathname + search }} replace />;
  }

  return loading ? <LoadingIndicator /> : <Outlet />;
}
