import React from 'react';

import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import routes from '@/routes';

import sampleHillChartImage from './sampleHillChartFull.png';

const StyledImage = styled.img`
  width: 85%;
  max-width: 1200px;
  ${tw`rounded shadow-lg`}
`;

export default function Home() {
  return (
    <div className="text-center p-8 pb-20 text-gray-800 relative">
      <Typography variant="h3" component="h2">Welcome!</Typography>
      <Typography component="p" className="mt-2">
        Shape My Tasks is a simple application for tracking tasks on a
        {' '}
        <a target="_blank" rel="noreferrer" href="https://basecamp.com/shapeup" className="underline font-semibold">
          Shape Up
        </a>
        -inspired hill chart.
      </Typography>
      <div className="flex items-center justify-center mt-8">
        <StyledImage src={sampleHillChartImage} alt="Sample Hill Chart" />
      </div>
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
