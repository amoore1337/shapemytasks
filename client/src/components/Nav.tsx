import React, { useContext, useState } from 'react';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Popover,
  Toolbar,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import DefaultAvatar from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import LoginIcon from '@material-ui/icons/PersonOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import routes from '../routes';
import { CurrentUserContext } from '../CurrentUserContext';

const Avatar = styled.button`
  padding: 2px;
  ${tw`bg-white rounded-full shadow-lg`}
  img {
    background-size: 38px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
`;

const UserMenu = styled.div`
  ${tw`flex flex-col py-4`}
  min-width: 200px;
`;

export default function TopNav() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [userMenu, setUserMenu] = useState<HTMLButtonElement>();
  const [sideNavOpened, setSideNavOpened] = useState(false);
  const { currentUser, onLogout } = useContext(CurrentUserContext);
  const history = useHistory();

  const loginButton = (
    <Button variant="outlined" component={RouterLink} to={routes.login}>
      Login
    </Button>
  );

  const handleAvatarClick = (event: MouseEvent) => {
    setUserMenu(event.currentTarget as HTMLButtonElement);
    setUserMenuOpened((isOpened) => !isOpened);
  };

  const handleLogout = async () => {
    setUserMenuOpened(false);
    await fetch('/api/auth/logout');
    onLogout();
    history.push('/home');
  };

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
        <Typography variant="h6" className="flex-grow" color="inherit">
          Shape My Tasks
        </Typography>
        {currentUser ? (
          <Avatar onClick={handleAvatarClick}>
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="avatar" />
            ) : (
              <DefaultAvatar color="secondary" fontSize="large" />
            )}
          </Avatar>
        ) : loginButton}
        <Popover
          open={userMenuOpened}
          anchorEl={userMenu}
          onClose={() => setUserMenuOpened(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          classes={{ paper: 'p-2' }}
        >
          <UserMenu>
            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
          </UserMenu>
        </Popover>
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
            <ListItem button component={RouterLink} to={routes.dashboard} onClick={onClose}>
              <ListItemIcon>
                <DashboardIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
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
