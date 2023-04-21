import type { MouseEvent} from 'react';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Grid, IconButton, Link, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import DeleteConfirmationModal from '@/components/ConfirmationModal';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useDeleteProject } from '@/models/project';
import type { Project} from '@/models/types';
import { ProjectsDocument } from '@/models/types';
import routes, { withParams } from '@/routes';

import AddProjectCard from './AddProjectCard';
import EditProjectModal from './EditProjectModal';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<null | Project>();
  const { data, loading } = useQuery(ProjectsDocument);
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
      <div className="p-8 text-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <Grid container spacing={2} justifyContent="center">
        {data?.projects?.map((project) => (
          <Grid item key={project?.id}>
            <ProjectCard className="hover:bg-blue-100">
              <Link
                component={RouterLink}
                to={withParams(routes.project, { id: project!.id })}
                className="flex h-full w-full items-center justify-center text-gray-800"
                underline="none"
              >
                {project?.title}
              </Link>
              <ProjectActionsMenu
                onEdit={() => handleProjectEdit(project)}
                onDelete={() => handleProjectDelete(project)}
              />
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

function ProjectActionsMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleEdit = () => {
    setMenuAnchor(null);
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = () => {
    setMenuAnchor(null);
    if (onDelete) {
      onDelete();
    }
  };
  return (
    <>
      <IconButton size="small" className="absolute top-2 right-2" onClick={handleMenuOpen}>
        <MoreIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(null)}
        keepMounted
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" className="mr-3" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" className="mr-3" />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
