import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';

import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ProjectsIcon from '@material-ui/icons/Apps';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import LoginIcon from '@material-ui/icons/PersonOutline';
import { Link as RouterLink, useHistory, useRouteMatch } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { CurrentUserContext } from '../../CurrentUserContext';
import routes, { withParams } from '../../routes';

import JumpToProjectDropdown from './JumpToProjectDropdown';
import UserMenu from './UserMenu';

export default function Nav() {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const [jumpToProjectId, setJumpToProjectId] = useState<string>();
  const [sideNavOpened, setSideNavOpened] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  const projectRouteMatch = useRouteMatch<{ id: string }>(routes.project);

  useEffect(() => {
    setJumpToProjectId(projectRouteMatch?.params.id);
  }, [projectRouteMatch]);

  const handleJumpToProject = useCallback((projectId: string) => {
    setJumpToProjectId(projectId);
    history.push(withParams(routes.project, { id: projectId }));
  }, []);

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton className="mr-2" edge="start" color="secondary" onClick={() => setSideNavOpened(true)}>
          <MenuIcon />
        </IconButton>
        <SideNav
          open={sideNavOpened}
          onClose={() => setSideNavOpened(false)}
          loggedIn={!!currentUser}
        />
        <div className="flex items-center flex-grow">
          <Typography variant="h6" component="h1" className="mr-4" color="inherit">
            Shape My Tasks
          </Typography>
          {!isMobile && <JumpToProjectDropdown selectedProjectId={jumpToProjectId} onChange={handleJumpToProject} />}
        </div>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

const DrawerContent = styled.div`
  width: 250px;
  ${tw`p-4`}
`;

type SideNavProps = {
  open: boolean;
  loggedIn: boolean;
  onClose: () => void;
}
function SideNav({ open, onClose, loggedIn }: SideNavProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <DrawerContent>
        <List component="nav">
          <ListItem button component={RouterLink} to={routes.home} onClick={onClose}>
            <ListItemIcon>
              <HomeIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {loggedIn && (
          <>
            <ListItem button component={RouterLink} to={routes.dashboard} onClick={onClose}>
              <ListItemIcon>
                <DashboardIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={RouterLink} to={routes.projects} onClick={onClose}>
              <ListItemIcon>
                <ProjectsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
          </>
          )}
          {!loggedIn && (
            <ListItem button component={RouterLink} to={routes.login} onClick={onClose}>
              <ListItemIcon>
                <LoginIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </DrawerContent>
    </Drawer>
  );
}
