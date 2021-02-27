import { gql, useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React from 'react';
import AddProjectCard from './AddProjectCard';
import ProjectCard from './ProjectCard';
import { AllProjects } from './types/AllProjects';

const ALL_PROJECTS = gql`
  query AllProjects {
    projects {
      id
      title
      description
      visibility
    }
  }
`;

export default function Projects() {
  const { data } = useQuery<AllProjects>(ALL_PROJECTS, { nextFetchPolicy: 'network-only' });

  return (
    <div className="text-center p-8">
      <Grid container spacing={2} justify="center">
        {data?.projects?.map((project) => (
          <Grid item key={project?.id}>
            <ProjectCard>
              {project?.title}
            </ProjectCard>
          </Grid>
        ))}
        <Grid item>
          <AddProjectCard />
        </Grid>
      </Grid>
    </div>
  );
}
