import { useCallback, useEffect, useState } from 'react';

import JumpToProjectDropdown from '@/components/nav/JumpToProjectDropdown';
import UserMenu from '@/components/nav/UserMenu';
import { useCurrentUser } from '@/CurrentUserContext';
import routes, { withParams } from '@/routes';
import ProjectsIcon from '@mui/icons-material/Apps';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/PersonOutline';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

export default function Nav() {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const [jumpToProjectId, setJumpToProjectId] = useState<string>();
  const [sideNavOpened, setSideNavOpened] = useState(false);
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const projectRouteMatch = useMatch(routes.project);

  useEffect(() => {
    setJumpToProjectId(projectRouteMatch?.params.id);
  }, [projectRouteMatch]);

  const handleJumpToProject = useCallback(
    (projectId: string) => {
      setJumpToProjectId(projectId);
      navigate(withParams(routes.project, { id: projectId }));
    },
    [navigate]
  );

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <IconButton
          className="mr-2"
          edge="start"
          color="primary"
          onClick={() => setSideNavOpened(true)}
        >
          <MenuIcon />
        </IconButton>
        <SideNav
          open={sideNavOpened}
          onClose={() => setSideNavOpened(false)}
          loggedIn={!!currentUser}
        />
        <div className="flex flex-grow items-center">
          <h1 className="mr-4 text-lg font-medium md:text-xl">Shape My Tasks</h1>
          {!isMobile && (
            <JumpToProjectDropdown
              selectedProjectId={jumpToProjectId}
              onChange={handleJumpToProject}
            />
          )}
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
};
function SideNav({ open, onClose, loggedIn }: SideNavProps) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <DrawerContent>
        <List component="nav">
          <ListItem button component={RouterLink} to={routes.home} onClick={onClose}>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {loggedIn && (
            <>
              <ListItem button component={RouterLink} to={routes.dashboard} onClick={onClose}>
                <ListItemIcon>
                  <DashboardIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={RouterLink} to={routes.projects} onClick={onClose}>
                <ListItemIcon>
                  <ProjectsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>
            </>
          )}
          {!loggedIn && (
            <ListItem button component={RouterLink} to={routes.login} onClick={onClose}>
              <ListItemIcon>
                <LoginIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </DrawerContent>
    </Drawer>
  );
}
