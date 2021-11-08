import React from 'react';

import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import routes from '@/routes';

import HillChartSection from './sections/HillChartSection';
import ScopeSection from './sections/ScopeSection';
import TitleSection from './sections/TitleSection';
import useDemoData, { PROJECT_ID } from './useDemoData';

export default function Home() {
  const [scopes, createScope] = useDemoData();

  return (
    <div className="py-20 relative w-full flex flex-col items-center text-gray-800">
      <TitleSection />
      <ScopeSection projectId={PROJECT_ID} scopes={scopes} createScope={createScope} />
      <HillChartSection scopes={scopes} />
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
