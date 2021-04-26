import React, { useContext, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

import { CurrentUserContext } from '@/CurrentUserContext';
import LoadingIndicator from '@/components/LoadingIndicator';
import TeamCodeCopyButton from '@/components/TeamCodeCopyButton';
import JoinTeamModal from '@/components/joinTeamModal/JoinTeamModal';

import { DashboardTeamMembersList } from './types/DashboardTeamMembersList';

const FETCH_TEAM_MEMBERS = gql`
  query DashboardTeamMembersList {
    currentUser {
      id
      team {
        id
        members {
          id
          name
          email
        }
      }
    }
  }
`;

export default function TeamMembersCard() {
  const { currentUser } = useContext(CurrentUserContext);
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const { loading, data } = useQuery<DashboardTeamMembersList>(FETCH_TEAM_MEMBERS);

  const members = data?.currentUser?.team?.members || [];

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
            color="secondary"
            startIcon={<GroupIcon color="secondary" fontSize="large" />}
            onClick={() => setOpenTeamsModal(true)}
          >
            Create / Join Team
          </Button>
        </>
      )}
      <JoinTeamModal open={openTeamsModal} onClose={() => setOpenTeamsModal(false)} />
    </section>
  );
}
