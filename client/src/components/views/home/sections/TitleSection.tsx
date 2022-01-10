import React from 'react';

import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Dot from '@/components/Dot';
import routes from '@/routes';

export default function TitleSection({ isMobile }: { isMobile: boolean }) {
  return isMobile ? (
    <div className="flex flex-col justify-center items-center px-4 w-full" style={{ maxWidth: 800 }}>
      <Visual className="mb-8" />
      <Callout isMobile />
    </div>
  ) : (
    <div className="flex justify-between items-center px-8 w-full" style={{ maxWidth: 1200 }}>
      <Callout />
      <Visual className="mt-8" />
    </div>
  );
}

function Callout({ isMobile }: { isMobile?: boolean }) {
  return (
    <div>
      <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" className="relative">
        {!isMobile && <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />}
        Get your tasks
        <br />
        into shape.
      </Typography>
      <Typography component="p" className="mt-2 text-lg">
        Organize and track your tasks on a
        {' '}
        <a target="_blank" rel="noreferrer" href="https://basecamp.com/shapeup" className="underline font-semibold">
          Shape Up
        </a>
        -inspired hill chart.
      </Typography>
      <div className={`flex ${isMobile ? 'flex-col justify-center pl-8' : 'items-center'} mt-4 text-gray-700 italic`}>
        <div className="flex items-center">
          <Dot size={12} className="mx-2" />
          <div>Quick to setup</div>
        </div>
        <div className="flex items-center">
          <Dot size={12} className="mx-2" />
          <div>Simple to use</div>
        </div>
        <div className="flex items-center">
          <Dot size={12} className="mx-2" />
          <Link className="text-gray-700 font-bold underline" component={RouterLink} to={routes.login}>Sign in to get started</Link>
        </div>
      </div>
    </div>
  );
}

function Visual({ className = '' }: {className?: string}) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Typography component="h2" className="text-6xl">Shape My Tasks</Typography>
      <Typography className="text-sm text-gray-700 pt-2">(Logo coming soon)</Typography>
    </div>
  );
}
