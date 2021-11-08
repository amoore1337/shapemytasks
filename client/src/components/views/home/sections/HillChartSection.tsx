import React from 'react';

import { Typography } from '@material-ui/core';

import HillChart from '@/components/hillChart/HillChart';

import Dot from '../Dot';
import { Scope } from '../useDemoData';

type Props = {
  scopes: Scope[];
}

export default function HillChartSection({ scopes }: Props) {
  return (
    <div className="flex justify-between items-center px-8 w-full mt-20" style={{ maxWidth: 1200 }}>
      <div>
        <Typography variant="h3" component="h2" className="relative">
          <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />
          Convey progress
          <br />
          in a meaningful way.
        </Typography>
        <Typography component="p" className="mt-2 text-lg">
          Visually track your scopes acress a hill chart.
        </Typography>
      </div>
      <div className="flex items-center justify-center mt-8" style={{ height: 300, width: 800 }}>
        <HillChart
          width="100%"
          height="100%"
          data={scopes}
          allowEdit
          noActions
        />
      </div>
    </div>
  );
}
