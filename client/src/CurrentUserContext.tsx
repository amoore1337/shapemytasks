/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useCallback, useEffect, useState,
} from 'react';

import { useApolloClient } from '@apollo/client';

import useCurrentUserQuery, { CurrentUser } from '@/api/queries/useLazyQueryCurrentUser';

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

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>();
  const [loading, setLoading] = useState(true);
  const [fetchUser, { loading: queryLoading, data }] = useCurrentUserQuery({ nextFetchPolicy: 'network-only' });

  const client = useApolloClient();

  const loadUser = useCallback(async () => {
    setLoading(true);
    fetchUser();
  }, []);

  // We need to keep a separate, in-mem copy of currentUser so that
  // we can explicitly nil it out before emptying the cache.
  // Without it, components relying on auth could attempt to perform an
  // authenticated action before currentUser has had a chance to update.
  useEffect(() => {
    setCurrentUser(data?.currentUser);
    // Only update the loading state after the most recent currentUser value has been set.
    setLoading(queryLoading);
  }, [data]);

  useEffect(() => {
    loadUser();
    // Outside React contexts, like Apollo, need to be able to trigger logout as well.
    const logout = (e: Event) => {
      e.stopPropagation();
      handleLogout();
    };
    document.addEventListener('logout', logout);
    return () => document.removeEventListener('logout', logout);
  }, []);

  const handleLogout = useCallback(async () => {
    setCurrentUser(null);
    await fetch('/api/auth/logout');
    await client.resetStore();
  }, []);

  return (
    <CurrentUserContext.Provider value={{
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
