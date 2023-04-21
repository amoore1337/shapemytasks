import { gql } from '@/apollo';
import ConfirmationModal from '@/components/ConfirmationModal';
import LoadingIndicator from '@/components/LoadingIndicator';
import ManageTeamModal from '@/components/ManageTeamModal';
import TeamCodeCopyButton from '@/components/TeamCodeCopyButton';
import { useCurrentUser } from '@/CurrentUserContext';
import { useRemoveUserFromTeam } from '@/models/team/useRemoveFromTeam';
import { useQuery } from '@apollo/client';
import GroupIcon from '@mui/icons-material/Group';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

const TEAM_MEMBERS_QUERY = gql(`
  query TeamMembers($id: ID!) {
    team(id: $id) {
      id
      members {
        id
        name
        email
      }
    }
  }
`);

export default function TeamMembersCard() {
  const { currentUser } = useCurrentUser();
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const [userToRemove, setUserToRemove] = useState<string>();
  const { loading, data } = useQuery(TEAM_MEMBERS_QUERY, {
    variables: { id: currentUser?.team?.id! },
    skip: !currentUser?.team?.id,
  });

  const [removeTeamMember] = useRemoveUserFromTeam();

  const confirmRemoveUser = () => {
    if (userToRemove) {
      removeTeamMember(userToRemove);
    }
    setUserToRemove(undefined);
  };

  const members = data?.team?.members || [];

  return (
    <section className="rounded bg-white p-4 text-gray-800 shadow">
      <div className="flex w-full justify-between">
        <Typography variant="h6" component="h2">
          Team Members
        </Typography>
        {currentUser?.team && (
          // TODO: Ugh, TeamCodeCopyButton should handle it's own static width better:
          <div style={{ width: 190 }}>
            <TeamCodeCopyButton teamCode={currentUser.team.joinCode || ''} />
          </div>
        )}
      </div>
      {loading && <LoadingIndicator />}
      {members.length > 0 && (
        <ul>
          {members.map(
            (member) =>
              member && (
                <li
                  className="border-b border-solid border-blue-200 py-2 last:border-b-0"
                  key={member.id}
                >
                  {member.name || member.email}
                  {member.id === currentUser?.id && (
                    <span className="ml-2 text-sm italic text-gray-400">(You)</span>
                  )}
                  {member.id !== currentUser?.id && (
                    <Button
                      variant="outlined"
                      className="ml-2"
                      color="error"
                      onClick={() => setUserToRemove(member.id)}
                    >
                      Remove
                    </Button>
                  )}
                </li>
              )
          )}
        </ul>
      )}
      {!currentUser?.team && (
        <>
          <p>You are not currently part of a team. Join or create one to start collaborating:</p>
          <Button
            variant="outlined"
            className="mb-2"
            color="primary"
            startIcon={<GroupIcon color="primary" fontSize="large" />}
            onClick={() => setOpenTeamsModal(true)}
          >
            Create / Join Team
          </Button>
        </>
      )}
      <ManageTeamModal open={openTeamsModal} onClose={() => setOpenTeamsModal(false)} />
      <ConfirmationModal
        open={!!userToRemove}
        title="Are you sure you want to remove user?"
        text="The user will no longer have access to any projects or scopes associated with your team. This action cannot be undone."
        onCancel={() => setUserToRemove(undefined)}
        onConfirm={confirmRemoveUser}
      />
    </section>
  );
}
