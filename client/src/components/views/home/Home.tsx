import React from 'react';

import { Typography } from '@material-ui/core';
import tw, { styled } from 'twin.macro';

import sampleHillChartImage from './sampleHillChartFull.png';

const StyledImage = styled.img`
  width: 85%;
  max-width: 1200px;
  ${tw`rounded shadow-lg`}
`;

export default function Home() {
  return (
    <div className="text-center p-8 text-gray-800">
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
    </div>
  );
}
