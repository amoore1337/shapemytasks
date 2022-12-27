import { ProjectQuery } from '@/models/types';

import buildRefetchSubscriberHook from '../buildRefetchSubscriberHook';

export * from './useRegisterProjectSubscriptions';
export * from './useCreateProject';
export * from './useUpdateProject';
export * from './useDeleteProject';

export const useProjectRefetchSubscriber = buildRefetchSubscriberHook('projects');

export type Project = ProjectQuery['project'];
