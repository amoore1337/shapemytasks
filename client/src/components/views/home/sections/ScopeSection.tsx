import { Typography } from '@mui/material';

import Dot from '@/components/Dot';
import ScopeList from '@/components/views/project/scopeList/ScopeList';

import scopes, { PROJECT_ID } from '../demoData';
import { MAX_MOBILE_WIDTH, MAX_SUBTEXT_WIDTH, MAX_TITLE_WIDTH, MAX_WIDTH } from '../helpers';

export default function ScopeSection({ isMobile }: { isMobile: boolean }) {
  return isMobile ? (
    <div
      className="mt-20 flex w-full flex-col items-center justify-center px-4"
      style={{ maxWidth: MAX_MOBILE_WIDTH }}
    >
      <CaptureSection isMobile />
      <div className="flex justify-center">
        <Visual isMobile className="mt-8" />
      </div>
      <OrganizeSection isMobile />
    </div>
  ) : (
    <div className="mt-28 flex w-full items-center justify-between" style={{ maxWidth: MAX_WIDTH }}>
      <div className="flex flex-1 justify-center">
        <Visual />
      </div>
      <div>
        <CaptureSection />
        <OrganizeSection />
      </div>
    </div>
  );
}

function Visual({ isMobile, className = '' }: { isMobile?: boolean; className?: string }) {
  return (
    <div
      className={`flex ${className}`}
      style={{ height: isMobile ? 225 : 185, width: isMobile ? 350 : 500 }}
    >
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
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        component="h2"
        className="relative"
        maxWidth={MAX_TITLE_WIDTH}
      >
        {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
        Scope out your work.
      </Typography>
      <Typography component="p" className="mt-2 text-lg" maxWidth={MAX_SUBTEXT_WIDTH}>
        Effortlessly capture the meaningful parts of your project.
      </Typography>
    </div>
  );
}

function OrganizeSection({ isMobile }: { isMobile?: boolean }) {
  return (
    <div>
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        component="h2"
        className={`${isMobile ? 'mt-8' : 'mt-14'} relative`}
        maxWidth={isMobile ? 390 : MAX_TITLE_WIDTH}
      >
        {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
        Organize and prioritize scopes collaboratively.
        {/* {isMobile ? ' ' : <br />} */}
      </Typography>
      <Typography component="p" className="mt-2 text-lg" maxWidth={MAX_SUBTEXT_WIDTH}>
        Rearrange and edit scopes with live updates.
      </Typography>
    </div>
  );
}
