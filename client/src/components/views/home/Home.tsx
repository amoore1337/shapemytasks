import React from 'react';

import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import routes from '@/routes';

import HillChartSection from './sections/HillChartSection';
import ScopeSection from './sections/ScopeSection';
import TitleSection from './sections/TitleSection';

export default function Home() {
  return (
    <div className="py-20 relative w-full flex flex-col items-center text-gray-800">
      <TitleSection />
      <ScopeSection />
      <HillChartSection />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-0 text-center inset-x-0 pb-2">
      <Link className="text-gray-300 text-sm" component={RouterLink} to={routes.privacy}>Privacy Policy</Link>
    </div>
  );
}
