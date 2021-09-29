import { useLazyQuery, gql, LazyQueryHookOptions } from '@apollo/client';

import { CurrentUser_currentUser as ICurrentUser, CurrentUser as Response } from './types/CurrentUser';

export type CurrentUser = ICurrentUser;

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

export default function useCurrentUserQuery(options?: LazyQueryHookOptions<Response>) {
  return useLazyQuery<Response>(CURRENT_USER, options);
}
