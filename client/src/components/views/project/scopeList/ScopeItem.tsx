import React from 'react';
import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

type Props = {
  scope: Scope;
}

export default function ScopeItem({ scope }: Props) {
  return (
    <div className="p-2">
      {scope.title}
    </div>
  );
}
