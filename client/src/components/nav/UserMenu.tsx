import React, { useContext, useState } from 'react';

import DefaultAvatar from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import {
  Popover, Button, Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { CurrentUserContext } from '@/CurrentUserContext';
import ManageTeamModal from '@/components/ManageTeamModal';
import TeamCodeCopyButton from '@/components/TeamCodeCopyButton';
import routes from '@/routes';

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
              <DefaultAvatar color="primary" fontSize="large" />
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
  const { onClose } = props;
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const { currentUser, logout } = useContext(CurrentUserContext);

  const handleLogout = async () => {
    if (onClose) {
      onClose();
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
                <GroupIcon color="primary" />
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
            color="primary"
            startIcon={<GroupIcon color="primary" fontSize="large" />}
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
