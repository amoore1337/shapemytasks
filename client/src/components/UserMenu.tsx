import { Popover, Button, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import tw, { styled } from 'twin.macro';
import GroupIcon from '@material-ui/icons/Group';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../CurrentUserContext';

const MenuContent = styled.div`
  ${tw`flex flex-col py-4`}
  min-width: 200px;
`;

type Props = {
  open: boolean;
  anchorEl?: Element;
  onClose?: () => void;
}

export default function Home(props: Props) {
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
          <Typography>{currentUser.email}</Typography>
        )}
        <Button
          variant="outlined"
          className="mb-2"
          color="secondary"
          startIcon={<GroupIcon color="secondary" fontSize="large" />}
        >
          Create Team
        </Button>
        <Button variant="outlined" color="inherit" className="text-danger" onClick={handleLogout}>Logout</Button>
      </MenuContent>
    </Popover>
  );
}
