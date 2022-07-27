import React, { useState, MouseEvent, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/MoreVert';
import {
  Button, ButtonProps, IconButton, Menu, MenuItem,
} from '@mui/material';
import tw, { styled } from 'twin.macro';

const StyledButton = styled(Button)`
  ${tw`bg-white p-2 shadow normal-case`}
  width: 265px;
  height: 200px;
`;

type Props = ButtonProps & {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProjectCard({
  onEdit, onDelete, onClick, children, className = '', ...props
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
      className={`${className} relative flex flex-col justify-center items-center`}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      onClick={hasActions ? undefined : onClick}
      {...props}
    >
      {hasActions && (
        <>
          <IconButton size="small" className="absolute top-2 right-2" onClick={handleMenuOpen}>
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
    </StyledButton>
  );
}
