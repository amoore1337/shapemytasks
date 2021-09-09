import { useContext, useEffect } from 'react';

import { useLazyQuery, gql } from '@apollo/client';

import { CurrentUserContext } from './CurrentUserContext';
import { Heartbeat } from './types/Heartbeat';

const HEARTBEAT = gql`
  query Heartbeat {
    heartbeat {
      authenticated
    }
  }
`;

const FIVE_MINUTES = 5 * 60 * 1000;

export default function useHeartbeat() {
  const { currentUser, logout } = useContext(CurrentUserContext);
  const [checkHealth, {
    loading, data, stopPolling, startPolling,
  }] = useLazyQuery<Heartbeat>(HEARTBEAT, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    checkHealth();
    return () => {
      if (stopPolling) { stopPolling(); }
    };
  }, []);

  useEffect(() => {
    if (!currentUser && stopPolling) {
      stopPolling();
    } else if (currentUser && startPolling) {
      startPolling(FIVE_MINUTES);
    }
  }, [currentUser]);

  useEffect(() => {
    if (loading || !data?.heartbeat) { return; }
    if (currentUser && !data.heartbeat.authenticated) {
      logout();
    }
  }, [data]);
}
