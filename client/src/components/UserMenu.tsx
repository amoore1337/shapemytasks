import { Popover, Button, Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { CurrentUserContext } from '../CurrentUserContext';
import JoinTeamModal from './JoinTeamModal';
import TeamCodeCopyButton from './TeamCodeCopyButton';

const MenuContent = styled.div`
  ${tw`flex flex-col py-2 text-gray-800`}
  min-width: 200px;
`;

type Props = {
  open: boolean;
  anchorEl?: Element;
  onClose?: () => void;
}

export default function UserMenu(props: Props) {
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const { currentUser, logout } = useContext(CurrentUserContext);
  const history = useHistory();

  const handleLogout = async () => {
    logout();
    if (props.onClose) {
      props.onClose();
    }

    history.push('/home');
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
      <JoinTeamModal open={openTeamsModal} onClose={() => setOpenTeamsModal(false)} />
    </Popover>
  );
}
