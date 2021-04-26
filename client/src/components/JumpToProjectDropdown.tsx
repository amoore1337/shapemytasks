import React, { useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import LoadingIndicator from './LoadingIndicator';
import { JumpToProjectOptions, JumpToProjectOptions_projects as Project } from './types/JumpToProjectOptions';

const PROJECT_OPTIONS = gql`
  query JumpToProjectOptions {
    projects {
      id
      title
      description
      visibility
    }
  }
`;

type Props = {
  selectedProjectId?: string;
  onChange: (projectId: string) => void;
}

export default function JumpToProjectDropdown({ selectedProjectId, onChange }: Props) {
  const { data, loading } = useQuery<JumpToProjectOptions>(PROJECT_OPTIONS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = data?.projects || [];
  useEffect(() => {
    setSelectedProject(projects.find((p) => p?.id === selectedProjectId) || null);
  }, [selectedProjectId, data]);

  if (selectedProjectId && !data) { return null; }

  return (
    <div>
      <Autocomplete
        options={projects}
        value={selectedProject}
        onChange={(_, value) => value && onChange(value.id)}
        getOptionLabel={(option) => option?.title || 'Project'}
        style={{ width: 300 }}
        renderInput={(params) => (
          loading ? <LoadingIndicator />
            : <TextField {...params} size="small" color="secondary" label="Jump to project..." variant="outlined" />
        )}
      />
    </div>
  );
}
