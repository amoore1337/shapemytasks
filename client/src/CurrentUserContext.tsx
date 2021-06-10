import React, { createContext } from 'react';

import { useQuery, gql } from '@apollo/client';

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
  const { loading, data, refetch } = useQuery<Response>(CURRENT_USER, { nextFetchPolicy: 'network-only' });

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    refetch();
  };

  const handleRefresh = async () => { refetch(); };

  return (
    <CurrentUserContext.Provider value={{
      currentUser: data?.currentUser,
      loading,
      logout: handleLogout,
      refresh: handleRefresh,
    }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
