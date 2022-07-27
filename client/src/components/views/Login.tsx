import React, { useContext, useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Button, Paper } from '@mui/material';
import { RouteComponentProps } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { CurrentUserContext } from '@/CurrentUserContext';
import { CURRENT_USER_FRAGMENT } from '@/api/queries/useLazyQueryCurrentUser';
import LoadingIndicator from '@/components/LoadingIndicator';
import { ReactComponent as GoogleIcon } from '@/icons/google.svg';
import logo from '@/icons/smt_logo.png';
import routes from '@/routes';
import { openPopup } from '@/utils/window';

import { LoggingInUser } from './types/LoggingInUser';

const LoginContainer = styled(Paper)(() => [
  tw`p-8 flex flex-col items-center`,
  `
    width: 500px;
  `,
]);

const LOGIN_URL = '/api/auth/google';

const LOGGING_IN_USER_QUERY = gql`
  query LoggingInUser {
    currentUser {
      ...CurrentUserFragment
    }
  }
  ${CURRENT_USER_FRAGMENT}
`;

type Props = RouteComponentProps<{}, any, { from?: string }>;

export default function Login({ history, location }: Props) {
  const [loggingIn, setLoggingIn] = useState(false);
  const { data, stopPolling } = useQuery<LoggingInUser>(
    LOGGING_IN_USER_QUERY,
    { skip: !loggingIn, pollInterval: 1000, fetchPolicy: 'network-only' },
  );
  const { currentUser, loading, refresh } = useContext(CurrentUserContext);

  useEffect(() => {
    if (data?.currentUser) {
      setLoggingIn(false);
      stopPolling();
      refresh();
    }
  }, [data]);

  useEffect(() => {
    if (!loading && currentUser) {
      history.replace(toLocation(location.state?.from));
    }
  }, [currentUser, loading]);

  const handleLoginStart = () => {
    openPopup(LOGIN_URL, 'Google Login');
    setLoggingIn(true);
  };

  return (
    <div className="flex items-center justify-center absolute inset-0">
      <LoginContainer elevation={3}>
        <img src={logo} alt="logo" width={250} height={250} className="mb-12" />
        <div className="flex justify-center items-center flex-grow">
          {loggingIn ? (
            <div className="italic">
              <LoadingIndicator />
              Waiting for login&hellip;
            </div>
          ) : (
            <Button
              variant="outlined"
              className="normal-case text-lg border-2"
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
