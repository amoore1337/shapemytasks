import React from 'react';

import { Typography } from '@material-ui/core';

import ScopeList from '@/components/views/project/scopeList/ScopeList';

import Dot from '../Dot';
import { Scope } from '../useDemoData';

type Props = {
  projectId: string;
  scopes: Scope[];
  createScope: (projectId: string, title: string, color: string) => Promise<void>;
}

export default function ScopeSection({ projectId, scopes, createScope }: Props) {
  return (
    <div className="flex justify-between items-center px-8 w-full mt-20" style={{ maxWidth: 1200 }}>
      <div className="flex justify-center" style={{ height: 300, width: 500 }}>
        <ScopeList
          projectId={projectId}
          scopes={scopes}
          openDrawer={false}
          drawerContent={<div />}
          drawerEnabled={false}
          dragEnabled={false}
          moveScope={() => {}}
          createScope={createScope}
          demoMode
        />
      </div>
      <div>
        <CaptureSection />
        <OrganizeSection />
      </div>
    </div>
  );
}

function CaptureSection() {
  return (
    <div>
      <Typography variant="h3" component="h2" className="relative">
        <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />
        Scope out your work.
      </Typography>
      <Typography component="p" className="mt-2 text-lg">
        Effortlessly capture the meaningful parts of your project.
      </Typography>
    </div>
  );
}

function OrganizeSection() {
  return (
    <div>
      <Typography variant="h3" component="h2" className="mt-14 relative">
        <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />
        Organize and prioritize
        <br />
        scopes collaboratively.
      </Typography>
      <Typography component="p" className="mt-2 text-lg">
        Rearrange and edit scopes with live updates.
      </Typography>
    </div>
  );
}
