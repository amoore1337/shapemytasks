import React, { createContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { CurrentUser_currentUser as CurrentUser, CurrentUser as Response } from './types/CurrentUser';

type CurrentUserCtx = {
  currentUser?: CurrentUser | null,
  loading: boolean,
  onLogout: () => void;
 };
export const CurrentUserContext = createContext<CurrentUserCtx>({
  loading: true,
  onLogout: () => {},
});

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      name
      avatarUrl
    }
  }
`;

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const { loading, data, refetch } = useQuery<Response>(CURRENT_USER, { nextFetchPolicy: 'network-only' });

  const handleLogout = () => {
    console.log('refetching!');
    refetch();
  };

  return (
    <CurrentUserContext.Provider value={{
      currentUser: data?.currentUser,
      loading,
      onLogout: handleLogout,
    }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
