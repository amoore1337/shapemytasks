import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { gql } from './apollo';
import { useCurrentUser } from './CurrentUserContext';

const HEARTBEAT = gql(`
  query Heartbeat {
    heartbeat {
      authenticated
    }
  }
`);

const FIVE_MINUTES = 5 * 60 * 1000;

export default function useHeartbeat() {
  const { currentUser, logout } = useCurrentUser();
  const [checkHealth, { loading, data, stopPolling, startPolling }] = useLazyQuery(HEARTBEAT, {
    fetchPolicy: 'network-only',
  });

  // Check the health on initial render
  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  useEffect(() => {
    if (currentUser) {
      startPolling(FIVE_MINUTES);
    } else {
      stopPolling();
    }

    // Ensure we always clean up any existing polling
    return () => {
      stopPolling();
    };
  }, [currentUser, startPolling, stopPolling]);

  useEffect(() => {
    if (loading || !data?.heartbeat) {
      return;
    }
    if (!data.heartbeat.authenticated) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}
