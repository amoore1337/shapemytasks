import React, { useContext, useState } from 'react';

import GroupIcon from '@mui/icons-material/Group';
import { Button, Typography } from '@mui/material';

import { CurrentUserContext } from '@/CurrentUserContext';
import useQueryTeamMembers from '@/api/queries/useQueryTeamMembers';
import LoadingIndicator from '@/components/LoadingIndicator';
import ManageTeamModal from '@/components/ManageTeamModal';
import TeamCodeCopyButton from '@/components/TeamCodeCopyButton';

export default function TeamMembersCard() {
  const { currentUser } = useContext(CurrentUserContext);
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const { loading, data } = useQueryTeamMembers(currentUser?.team?.id || '', {
    skip: !currentUser?.team?.id,
  });

  const members = data?.team?.members || [];

  return (
    <section className="p-4 bg-white shadow rounded text-gray-800">
      <div className="flex w-full justify-between">
        <Typography variant="h6" component="h2">Team Members</Typography>
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
          {members.map((member) => member && (
            <li className="border-b border-solid border-blue-200 last:border-b-0 py-2" key={member.id}>
              {member.name || member.email}
            </li>
          ))}
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
    </section>
  );
}
