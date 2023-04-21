import type { Flag, Scope } from '@/models/types';
import { getRandomColor } from '@/utils/color';

export const PROJECT_ID = 'demo';

export default [
  buildScope('0', 'Create scopes with 1 click', getRandomColor(), 88),
  buildScope('1', 'Organize with live updates', getRandomColor(), 75),
  buildScope('2', 'Flag blocked work', getRandomColor(), 33, '0'),
  buildScope('3', "Mark nice-to-have's", getRandomColor(), 19, undefined, true),
];

function buildScope(
  id: string,
  title: string,
  color: string,
  progress: number,
  flag?: string,
  niceToHave = false
) {
  return {
    __typename: 'Scope',
    id,
    title,
    progress,
    color,
    projectId: PROJECT_ID,
    position: 'n',
    closedAt: null,
    niceToHave,
    createdAt: new Date(),
    updatedAt: new Date(),
    flag: buildFlag(flag),
  } as Scope;
}

function buildFlag(id?: string): Flag | null {
  if (!id) {
    return null;
  }
  return {
    __typename: 'Flag',
    id,
    scopeId: '0',
    message: null,
    createdBy: {
      __typename: 'User',
      id: '0',
      name: 'You',
      email: 'you@you.com',
      createdAt: 'foo',
      updatedAt: 'foo',
    },
    createdAt: 'foo',
    updatedAt: 'foo',
  };
}
