import LoadingIndicator from '@/components/LoadingIndicator';
import { useCurrentUser } from '@/CurrentUserContext';
import type { Project } from '@/models/types';
import { ProjectsDocument } from '@/models/types';
import { useQuery } from '@apollo/client';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  selectedProjectId?: string;
  onChange: (projectId: string) => void;
};

export default function JumpToProjectDropdown({ selectedProjectId, onChange }: Props) {
  const { currentUser } = useCurrentUser();
  const { data, loading } = useQuery(ProjectsDocument, { skip: !currentUser });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = useMemo(() => data?.projects || [], [data?.projects]);
  useEffect(() => {
    setSelectedProject(projects.find((p) => p?.id === selectedProjectId) || null);
  }, [selectedProjectId, data, projects]);

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
