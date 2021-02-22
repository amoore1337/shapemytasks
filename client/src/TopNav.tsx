import React from 'react';
import {
  AppBar, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export default function TopNav() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="flex-grow">
          Shape My Tasks
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
