import React from 'react';

import { Typography } from '@mui/material';

import Dot from '@/components/Dot';
import ScopeList from '@/components/views/project/scopeList/ScopeList';

import scopes, { PROJECT_ID } from '../demoData';

export default function ScopeSection({ isMobile }: { isMobile: boolean }) {
  return isMobile ? (
    <div className="flex flex-col justify-center items-center px-4 w-full mt-10" style={{ maxWidth: 800 }}>
      <CaptureSection isMobile />
      <div className="flex justify-center">
        <Visual isMobile className="mt-8" />
      </div>
      <OrganizeSection isMobile />
    </div>
  ) : (
    <div className="flex justify-between items-center px-8 w-full mt-20" style={{ maxWidth: 1200 }}>
      <div className="flex justify-center">
        <Visual />
      </div>
      <div>
        <CaptureSection />
        <OrganizeSection />
      </div>
    </div>
  );
}

function Visual({ isMobile, className }: { isMobile?: boolean, className?: string }) {
  return (
    <div className={`flex ${className}`} style={{ height: isMobile ? 225 : 200, width: isMobile ? 350 : 500 }}>
      <ScopeList
        projectId={PROJECT_ID}
        scopes={scopes}
        openDrawer={false}
        drawerContent={<div />}
        drawerEnabled={false}
        dragEnabled={false}
        moveScope={() => {}}
        readonlyMode
        compact={isMobile}
      />
    </div>
  );
}

function CaptureSection({ isMobile }: { isMobile?: boolean }) {
  return (
    <div>
      <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" className="relative">
        {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
        Scope out your work.
      </Typography>
      <Typography component="p" className="mt-2 text-lg">
        Effortlessly capture the meaningful parts of your project.
      </Typography>
    </div>
  );
}

function OrganizeSection({ isMobile }: { isMobile?: boolean }) {
  return (
    <div>
      <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" className={`${isMobile ? 'mt-8' : 'mt-14'} relative`}>
        {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
        Organize and prioritize
        {isMobile ? ' ' : <br />}
        scopes collaboratively.
      </Typography>
      <Typography component="p" className="mt-2 text-lg">
        Rearrange and edit scopes with live updates.
      </Typography>
    </div>
  );
}
