import { useContext, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { Button, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { CurrentUserContext } from '@/CurrentUserContext';
import LoadingIndicator from '@/components/LoadingIndicator';
import { ReactComponent as GoogleIcon } from '@/icons/google.svg';
import logo from '@/icons/smt_logo.png';
import { CURRENT_USER_QUERY } from '@/models/auth';
import routes from '@/routes';
import { openPopup } from '@/utils/window';

const LoginContainer = styled(Paper)(() => [
  tw`p-8 flex flex-col items-center`,
  `
    width: 500px;
  `,
]);

const LOGIN_URL = '/api/auth/google';

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(false);
  const { data, stopPolling } = useQuery(CURRENT_USER_QUERY, {
    skip: !loggingIn,
    pollInterval: 1000,
    fetchPolicy: 'network-only',
  });
  const { currentUser, loading, refresh } = useContext(CurrentUserContext);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.currentUser) {
      setLoggingIn(false);
      stopPolling();
      refresh();
    }
  }, [data]);

  useEffect(() => {
    if (!loading && currentUser) {
      navigate(toLocation(location.state?.from));
    }
  }, [currentUser, loading]);

  const handleLoginStart = () => {
    openPopup(LOGIN_URL, 'Google Login');
    setLoggingIn(true);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <LoginContainer elevation={3}>
        <img src={logo} alt="logo" width={250} height={250} className="mb-12" />
        <div className="flex flex-grow items-center justify-center">
          {loggingIn ? (
            <div className="italic">
              <LoadingIndicator />
              Waiting for login&hellip;
            </div>
          ) : (
            <Button
              variant="outlined"
              className="border-2 text-lg normal-case"
              startIcon={<GoogleIcon width={28} height={29} />}
              onClick={handleLoginStart}
            >
              Sign in with Google
            </Button>
          )}
        </div>
      </LoginContainer>
    </div>
  );
}

function toLocation(fromLocation: string | undefined) {
  let from = fromLocation || routes.projects;
  from = from.startsWith('/') ? from : `/${from}`;

  // Don't redirect back to the page we're on now:
  from = window.location.pathname === from ? routes.projects : from;

  return from;
}
