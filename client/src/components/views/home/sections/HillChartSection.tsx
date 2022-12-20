import React from 'react';

import { Typography } from '@mui/material';

import Dot from '@/components/Dot';
import HillChart from '@/components/hillChart/HillChart';

import scopes from '../demoData';
import { MAX_MOBILE_WIDTH, MAX_SUBTEXT_WIDTH, MAX_TITLE_WIDTH, MAX_WIDTH } from '../helpers';

export default function HillChartSection({ isMobile }: { isMobile: boolean }) {
  return isMobile ? (
    <div
      className="mt-20 flex w-full flex-col items-center justify-center px-4"
      style={{ maxWidth: MAX_MOBILE_WIDTH }}
    >
      <Visual isMobile />
      <Callout isMobile />
    </div>
  ) : (
    <div
      className="mt-20 flex w-full items-center justify-between px-10"
      style={{ maxWidth: MAX_WIDTH }}
    >
      <Callout />
      <Visual />
    </div>
  );
}

function Callout({ isMobile }: { isMobile?: boolean }) {
  return (
    <div>
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        component="h2"
        className="relative"
        maxWidth={isMobile ? 360 : MAX_TITLE_WIDTH}
      >
        {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
        Convey progress in a meaningful way.
      </Typography>
      <Typography component="p" className="mt-2 text-lg" maxWidth={MAX_SUBTEXT_WIDTH}>
        Visually track your scopes acress a hill chart.
      </Typography>
    </div>
  );
}

function Visual({ isMobile }: { isMobile?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center ${isMobile ? '' : 'mt-8'}`}
      style={{ height: isMobile ? 175 : 300, width: isMobile ? 375 : 650 }}
    >
      <HillChart width="100%" height="100%" data={scopes} labelClassName="text-sm" />
    </div>
  );
}
