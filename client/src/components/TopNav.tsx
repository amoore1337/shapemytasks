import {
  AppBar, Button, IconButton, Popover, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useContext, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { CurrentUserContext } from '../CurrentUserContext';
import routes from '../routes';

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

export default function TopNav() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [userMenu, setUserMenu] = useState<HTMLButtonElement>();
  const { currentUser, logout } = useContext(CurrentUserContext);
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
    logout();
    history.push('/home');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="flex-grow" color="inherit">
          Shape My Tasks
        </Typography>
        {currentUser?.avatarUrl ? (
          <Avatar onClick={handleAvatarClick}>
            <img src={currentUser.avatarUrl} alt="avatar" />
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
          <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
