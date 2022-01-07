import React from 'react';

import { Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import routes from '@/routes';

import Dot from '../Dot';

export default function TitleSection() {
  return (
    <div className="flex justify-between items-center px-8 w-full" style={{ maxWidth: 1200 }}>
      <div>
        <Typography variant="h3" component="h2" className="relative">
          <Dot className="absolute" style={{ left: -36, top: 16 }} size={26} />
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
        <div className="flex items-center mt-4 text-gray-700 italic">
          <div>Quick to setup</div>
          <Dot size={12} className="mx-2" />
          <div>Simple to use</div>
          <Dot size={12} className="mx-2" />
          <Link className="text-gray-700 font-bold underline" component={RouterLink} to={routes.login}>Sign in to get started</Link>
        </div>
      </div>
      <div className="flex items-center justify-center mt-8">
        Shape My Tasks Logo
      </div>
    </div>
  );
}
