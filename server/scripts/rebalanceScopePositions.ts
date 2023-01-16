import { Scopes } from '.prisma/client';
import { db } from '../app/db';
import { midString } from '../app/midString';

export default async function rebalanceByProject(projectId: string | undefined) {
  if (!projectId) {
    console.error('Please provide a project id to perform rebalance');
    return;
  }

  const scopes: Scopes[] = await db.$queryRaw`
    SELECT * from "Scopes" WHERE "projectId" = ${parseInt(projectId, 10)}
    ORDER BY position COLLATE "C" ASC;
  `;

  if (!scopes.length) {
    console.warn('No scopes found for project.');
    return;
  }

  let prevScope: Scopes | null = null;
  for (const scope of scopes) {
    const prevPosition = prevScope?.position ?? '';
    const position = midString(prevPosition, '');
    await db.scopes.update({ where: { id: scope.id }, data: { position } });
    console.log(`${scope.title} -> ${position}`);
    prevScope = scope;
  }
}
