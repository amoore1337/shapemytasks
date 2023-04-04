import { ProjectQuery } from '@/models/types';

import buildRefetchSubscriberHook from '../buildRefetchSubscriberHook';

export * from './useCreateProject';
export * from './useDeleteProject';
export * from './useRegisterProjectSubscriptions';
export * from './useUpdateProject';

export const useProjectRefetchSubscriber = buildRefetchSubscriberHook('projects');

export type Project = ProjectQuery['project'];
