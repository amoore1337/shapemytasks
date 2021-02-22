import React from 'react';
import {
  AppBar, Button, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import routes from './routes';

export default function TopNav() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="flex-grow" color="inherit">
          Shape My Tasks
        </Typography>
        <Button variant="outlined" component={RouterLink} to={routes.login}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
