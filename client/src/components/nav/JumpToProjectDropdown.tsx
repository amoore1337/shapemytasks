import React, { useContext, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { TextField, Autocomplete } from '@mui/material';

import { CurrentUserContext } from '@/CurrentUserContext';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Project, ProjectsDocument } from '@/models/types';

type Props = {
  selectedProjectId?: string;
  onChange: (projectId: string) => void;
};

export default function JumpToProjectDropdown({ selectedProjectId, onChange }: Props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { data, loading } = useQuery(ProjectsDocument, { skip: !currentUser });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = data?.projects || [];
  useEffect(() => {
    setSelectedProject(projects.find((p) => p?.id === selectedProjectId) || null);
  }, [selectedProjectId, data]);

  if (!data) {
    return null;
  }

  return (
    <div>
      <Autocomplete
        options={projects}
        value={selectedProject}
        onChange={(_, value) => value && onChange(value.id)}
        getOptionLabel={(option) => option?.title || 'Project'}
        style={{ width: 300 }}
        renderInput={(params) =>
          loading ? (
            <LoadingIndicator />
          ) : (
            <TextField
              {...params}
              size="small"
              color="primary"
              label="Jump to project..."
              variant="outlined"
            />
          )
        }
      />
    </div>
  );
}
