import { useQuery, gql } from '@apollo/client';
import React, { createContext } from 'react';
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

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
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
  }
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
