import React, { useState, MouseEvent, useEffect } from 'react';

import {
  Button, ButtonProps, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link as RouterLink } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import routes, { withParams } from '../../../routes';

const StyledButton = styled(Button)`
  ${tw`bg-white p-2 shadow normal-case`}
  width: 265px;
  height: 200px;

  &:hover {
    ${tw`bg-blue-100`}
  }
`;

type Props = ButtonProps & {
  projectId?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProjectCard({
  projectId, onEdit, onDelete, onClick, children, ...props
}: Props) {
  const [hoverActive, setHoverActive] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null);

  useEffect(() => {
    if (!hoverActive && menuAnchor) {
      setMenuAnchor(null);
    }
  }, [hoverActive]);

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

  const hasActions = !!(onEdit || onDelete);
  return (
    <StyledButton
      as={hasActions ? 'div' : undefined}
      className={`relative flex flex-col justify-center items-center ${menuAnchor || hoverActive ? 'bg-blue-100' : ''}`}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      onClick={hasActions ? undefined : onClick}
      {...props}
    >
      {hasActions && hoverActive && (
        <>
          <IconButton size="small" className="absolute top-2 right-2 bg-white" onClick={handleMenuOpen}>
            <MoreIcon fontSize="inherit" />
          </IconButton>
          <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)} keepMounted>
            {onEdit && (
              <MenuItem onClick={handleEdit}>
                <EditIcon fontSize="small" className="mr-3" />
                Edit
              </MenuItem>
            )}
            {onDelete && (
              <MenuItem onClick={handleDelete}>
                <DeleteIcon fontSize="small" className="mr-3" />
                Delete
              </MenuItem>
            )}
          </Menu>
        </>
      )}
      {children}
      {projectId && hasActions && hoverActive && (
        <Button
          component={RouterLink}
          to={withParams(routes.project, { id: projectId })}
          variant="outlined"
          className="bg-white normal-case"
        >
          Open Project
        </Button>
      )}
    </StyledButton>
  );
}
