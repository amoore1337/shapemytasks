import React, { createContext, useEffect, useState } from 'react';

import { useQuery, gql, useApolloClient } from '@apollo/client';

import { CurrentUser_currentUser as CurrentUser, CurrentUser as Response } from './types/CurrentUser';

type CurrentUserCtx = {
  currentUser?: CurrentUser | null,
  loading: boolean,
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
 };
export const CurrentUserContext = createContext<CurrentUserCtx>({
  loading: true,
  logout: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
});

export const CURRENT_USER_FRAGMENT = gql`
  fragment CurrentUserFragment on CurrentUser {
    id
    email
    name
    avatarUrl

    team {
      id
      name
      joinCode
    }
  }
`;

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      ...CurrentUserFragment
    }
  }
  ${CURRENT_USER_FRAGMENT}
`;

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>();
  const { loading, data, refetch } = useQuery<Response>(CURRENT_USER, { nextFetchPolicy: 'network-only' });
  const client = useApolloClient();

  // We need to keep a separate, in-mem copy of currentUser so that
  // we can explicitly nil it out before emptying the cache.
  // Without it, components relying on auth could attempt to perform an
  // authenticated action before currentUser has had a chance to update.
  useEffect(() => {
    setCurrentUser(data?.currentUser);
  }, [data]);

  const handleLogout = async () => {
    setCurrentUser(null);
    await fetch('/api/auth/logout');
    await client.resetStore();
  };

  const handleRefresh = async () => { refetch(); };

  return (
    <CurrentUserContext.Provider value={{
      currentUser,
      loading,
      logout: handleLogout,
      refresh: handleRefresh,
    }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
