import { Grid } from '@material-ui/core';
import React from 'react';
import AddProjectCard from './AddProjectCard';

export default function Projects() {
  return (
    <div className="text-center p-8">
      <Grid container spacing={2} justify="center">
        <Grid item>
          <AddProjectCard />
        </Grid>
      </Grid>
    </div>
  );
}
