import React, { useState } from 'react';

import { Grid, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import useDeleteProject from '@/api/mutations/useDeleteProject';
import { Projects_projects as Project } from '@/api/queries/types/Projects';
import useQueryProjects from '@/api/queries/useQueryProjects';
import DeleteConfirmationModal from '@/components/ConfirmationModal';
import LoadingIndicator from '@/components/LoadingIndicator';
import routes, { withParams } from '@/routes';

import AddProjectCard from './AddProjectCard';
import EditProjectModal from './EditProjectModal';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<null |Project>();
  const { data, loading } = useQueryProjects();
  const [destroyProject] = useDeleteProject();

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
      <Grid container spacing={2} justifyContent="center">
        {data?.projects?.map((project) => (
          <Grid item key={project?.id}>
            <ProjectCard
              onEdit={() => handleProjectEdit(project)}
              onDelete={() => handleProjectDelete(project)}
            >
              <Link
                component={RouterLink}
                to={withParams(routes.project, { id: project!.id })}
                className="text-gray-800"
              >
                {project?.title}
              </Link>
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
          project={selectedProject}
        />
      )}
    </div>
  );
}
