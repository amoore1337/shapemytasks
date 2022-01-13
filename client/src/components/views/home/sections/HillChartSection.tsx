import React from 'react';

import { Typography } from '@mui/material';

import Dot from '@/components/Dot';
import HillChart from '@/components/hillChart/HillChart';

import scopes from '../demoData';

export default function HillChartSection({ isMobile }: { isMobile: boolean }) {
  return isMobile ? (
    <div className="flex flex-col justify-center px-4 w-full mt-10" style={{ maxWidth: 800 }}>
      <Callout isMobile />
      <Visual isMobile />
    </div>
  ) : (
    <div className="flex justify-between items-center px-8 w-full mt-20" style={{ maxWidth: 1200 }}>
      <Callout />
      <Visual />
    </div>
  );
}

function Callout({ isMobile }: { isMobile?: boolean }) {
  return (
    <div>
      <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" className="relative" style={{ width: 500 }}>
        {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
        Convey progress
        <br />
        in a meaningful way.
      </Typography>
      <Typography component="p" className="mt-2 text-lg">
        Visually track your scopes acress a hill chart.
      </Typography>
    </div>
  );
}

function Visual({ isMobile }: { isMobile?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${isMobile ? '' : 'mt-8'}`} style={{ height: isMobile ? 175 : 300, width: isMobile ? 350 : 575 }}>
      <HillChart
        width="100%"
        height="100%"
        data={scopes}
        labelClassName="text-sm"
      />
    </div>
  );
}
