import React, { useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';

import DeleteConfirmationModal from '@/components/ConfirmationModal';
import LoadingIndicator from '@/components/LoadingIndicator';
import { removeCacheItem } from '@/utils/cache';

import AddProjectCard from './AddProjectCard';
import EditProjectModal from './EditProjectModal';
import ProjectCard from './ProjectCard';
import { AllProjects, AllProjects_projects as Project } from './types/AllProjects';
import { DeleteProject, DeleteProjectVariables } from './types/DeleteProject';

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

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProjectById(id: $id) {
      id
    }
  }
`;

export default function Projects() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<null |Project>();
  const { data, loading } = useQuery<AllProjects>(ALL_PROJECTS);
  const [destroyProject] = useMutation<DeleteProject, DeleteProjectVariables>(
    DELETE_PROJECT,
    removeCacheItem<DeleteProject, DeleteProjectVariables>('projects', 'deleteProjectById'),
  );

  const handleProjectEdit = (project: null | Project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleProjectDelete = (project: null | Project) => {
    setSelectedProject(project);
    setShowDeleteConfirmation(true);
  };

  const handleCancelAction = () => {
    setSelectedProject(null);
    setShowDeleteConfirmation(false);
    setShowEditModal(false);
  };

  const deleteProject = () => {
    destroyProject({ variables: { id: selectedProject!.id } });
    setSelectedProject(null);
    setShowDeleteConfirmation(false);
  };

  if (!data && loading) {
    return (
      <div className="text-center p-8">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="text-center p-8">
      <Grid container spacing={2} justify="center">
        {data?.projects?.map((project) => (
          <Grid item key={project?.id}>
            <ProjectCard
              projectId={project?.id}
              onEdit={() => handleProjectEdit(project)}
              onDelete={() => handleProjectDelete(project)}
            >
              {project?.title}
            </ProjectCard>
          </Grid>
        ))}
        <Grid item>
          <AddProjectCard />
        </Grid>
      </Grid>
      <DeleteConfirmationModal
        open={showDeleteConfirmation}
        onCancel={handleCancelAction}
        onConfirm={deleteProject}
        title={`Are you sure you want to delete "${selectedProject?.title}"?`}
        text="This action cannot be undone."
        confirmText="Delete"
        confirmButtonClassName="text-white bg-danger"
      />
      {selectedProject && (
        <EditProjectModal
          open={showEditModal}
          onClose={handleCancelAction}
          projectId={selectedProject.id}
        />
      )}
    </div>
  );
}
