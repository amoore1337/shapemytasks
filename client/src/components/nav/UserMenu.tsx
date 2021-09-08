import React, { useContext, useState } from 'react';

import {
  Popover, Button, Typography,
} from '@material-ui/core';
import DefaultAvatar from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import { Link as RouterLink } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import routes from '@/routes';

import { CurrentUserContext } from '../../CurrentUserContext';
import TeamCodeCopyButton from '../TeamCodeCopyButton';
import ManageTeamModal from '../manageTeamModal/ManageTeamModal';

const MenuContent = styled.div`
  ${tw`flex flex-col py-2 text-gray-800`}
  min-width: 200px;
`;

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

type Props = {
  open: boolean;
  anchorEl?: Element;
  onClose?: () => void;
}

export default function UserMenu() {
  const { currentUser, loading } = useContext(CurrentUserContext);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [userMenu, setUserMenu] = useState<HTMLButtonElement>();

  const handleAvatarClick = (event: MouseEvent) => {
    setUserMenu(event.currentTarget as HTMLButtonElement);
    setUserMenuOpened((isOpened) => !isOpened);
  };

  const loginButton = (
    <Button variant="outlined" component={RouterLink} to={routes.login}>
      Login
    </Button>
  );

  return (
    <>
      {!loading && (
        currentUser ? (
          <Avatar onClick={handleAvatarClick}>
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="avatar" />
            ) : (
              <DefaultAvatar color="secondary" fontSize="large" />
            )}
          </Avatar>
        ) : loginButton
      )}
      <Menu
        open={userMenuOpened}
        anchorEl={userMenu}
        onClose={() => setUserMenuOpened(false)}
      />
    </>
  );
}

function Menu(props: Props) {
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const { currentUser, logout } = useContext(CurrentUserContext);

  const handleLogout = async () => {
    if (props.onClose) {
      props.onClose();
    }
    await logout();
  };

  return (
    <Popover
      {...props}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      classes={{ paper: 'p-2' }}
    >
      <MenuContent>
        {currentUser && (
          <div className="px-2 pb-2">
            <Typography noWrap className="text-sm font-semibold">{currentUser.name || currentUser.email}</Typography>
            {currentUser.name && (
              <Typography noWrap className="text-xs">{currentUser.email}</Typography>
            )}
            {currentUser.team && (
              <div className="mt-2 flex items-center">
                <GroupIcon color="secondary" />
                <Typography noWrap className="ml-2 text-sm font-medium">{currentUser.team?.name}</Typography>
              </div>
            )}
          </div>
        )}
        {currentUser?.team ? (
          <TeamCodeCopyButton teamCode={currentUser.team.joinCode || ''} />
        ) : (
          <Button
            variant="outlined"
            className="mb-2"
            color="secondary"
            startIcon={<GroupIcon color="secondary" fontSize="large" />}
            onClick={() => setOpenTeamsModal(true)}
          >
            Create / Join Team
          </Button>
        )}
        <Button variant="outlined" color="inherit" className="text-danger" onClick={handleLogout}>Logout</Button>
      </MenuContent>
      <ManageTeamModal open={openTeamsModal} onClose={() => setOpenTeamsModal(false)} />
    </Popover>
  );
}
