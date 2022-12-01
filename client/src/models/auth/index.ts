import { gql } from '@/apollo';

import { CurrentUserQuery } from '../__generated__/graphql';

export type CurrentUser = CurrentUserQuery['currentUser'];

export const CURRENT_USER_QUERY = gql(`
  query CurrentUser {
    currentUser {
      ...CurrentUserFragment
    }
  }
`);
