import React from 'react';

import { Link, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import routes from '@/routes';

import HillChartSection from './sections/HillChartSection';
import ScopeSection from './sections/ScopeSection';
import TitleSection from './sections/TitleSection';

export default function Home() {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('lg'));
  return (
    <div className="relative flex w-full flex-col items-center py-20 text-gray-800">
      <TitleSection isMobile={isMobile} />
      <ScopeSection isMobile={isMobile} />
      <HillChartSection isMobile={isMobile} />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute inset-x-0 bottom-0 pb-2 text-center">
      <Link className="text-sm text-gray-300" component={RouterLink} to={routes.privacy}>
        Privacy Policy
      </Link>
    </div>
  );
}
