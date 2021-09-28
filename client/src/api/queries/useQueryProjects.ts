import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { Projects } from './types/Projects';
import { PROJECT_FRAGMENT_LITE } from './useQueryProject';

export const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      ...ProjectFragmentLite
    }
  }
  ${PROJECT_FRAGMENT_LITE}
`;

export default function useQueryProjects(options?: QueryHookOptions<Projects>) {
  return useQuery(
    PROJECTS_QUERY,
    options,
  );
}
