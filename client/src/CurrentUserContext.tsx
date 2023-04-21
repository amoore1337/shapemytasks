import type { CurrentUser } from '@/models/auth';
import { CURRENT_USER_QUERY } from '@/models/auth';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type CurrentUserCtx = {
  currentUser?: CurrentUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const CurrentUserContext = createContext<CurrentUserCtx | null>(null);

export function useCurrentUser() {
  const currentUserContext = useContext(CurrentUserContext);
  if (!currentUserContext) {
    new Error('Current User can only be read inside CurrentUserProvider');
  }

  return currentUserContext!;
}

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [loading, setLoading] = useState(true);
  const [fetchUser, { loading: queryLoading, data }] = useLazyQuery(CURRENT_USER_QUERY, {
    nextFetchPolicy: 'network-only',
  });

  const client = useApolloClient();

  const loadUser = useCallback(async () => {
    setLoading(true);
    fetchUser();
  }, [fetchUser]);

  const handleLogout = useCallback(async () => {
    setCurrentUser(null);
    await fetch('/api/auth/logout');
    await client.resetStore();
  }, [client]);

  // We need to keep a separate, in-mem copy of currentUser so that
  // we can explicitly nil it out before emptying the cache.
  // Without it, components relying on auth could attempt to perform an
  // authenticated action before currentUser has had a chance to update.
  useEffect(() => {
    setCurrentUser(data?.currentUser);
    // Only update the loading state after the most recent currentUser value has been set.
    setLoading(queryLoading);
  }, [data, queryLoading]);

  useEffect(() => {
    loadUser();
    // Outside React contexts, like Apollo, need to be able to trigger logout as well.
    const logout = (e: Event) => {
      e.stopPropagation();
      handleLogout();
    };
    document.addEventListener('logout', logout);
    return () => document.removeEventListener('logout', logout);
  }, [handleLogout, loadUser]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        loading,
        logout: handleLogout,
        refresh: loadUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
