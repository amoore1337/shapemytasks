import React, { useContext, useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Button, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { CurrentUserContext, CURRENT_USER_FRAGMENT } from '@/CurrentUserContext';
import { ReactComponent as GoogleIcon } from '@/icons/google.svg';
import routes from '@/routes';
import { openPopup } from '@/utils/window';

import LoadingIndicator from '../LoadingIndicator';

import { LoggingInUser } from './types/LoggingInUser';

const LoginContainer = styled(Paper)(() => [
  tw`p-8 flex flex-col`,
  `
    width: 500px;
    height: 300px;
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

export default function Login() {
  const [loggingIn, setLoggingIn] = useState(false);
  const { stopPolling } = useQuery<LoggingInUser>(
    LOGGING_IN_USER_QUERY,
    { skip: !loggingIn, pollInterval: 1000, fetchPolicy: 'network-only' },
  );
  const { currentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      setLoggingIn(false);
      stopPolling();
      history.push(routes.projects);
    }
  }, [currentUser]);

  const handleLoginStart = () => {
    openPopup(LOGIN_URL, 'Google Login');
    setLoggingIn(true);
  };

  return (
    <div className="flex items-center justify-center absolute inset-0">
      <LoginContainer elevation={3}>
        <Typography className="w-full text-center" variant="h3" component="h2">Sign in</Typography>
        <div className="flex justify-center items-center flex-grow">
          {loggingIn ? (
            <div className="italic">
              <LoadingIndicator />
              Waiting for login&hellip;
            </div>
          ) : (
            <Button
              variant="outlined"
              startIcon={<GoogleIcon width={24} height={25} />}
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
