import React, { useEffect, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button, TextField, Typography } from '@material-ui/core';

import Modal from '@/components/Modal';

import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

import { CreateFlag, CreateFlagVariables } from './types/CreateFlag';

const CREATE_FLAG = gql`
  mutation CreateFlag($scopeId: ID!, $message: String) {
    createFlag(scopeId: $scopeId, message: $message) {
      id
      message
      scopeId
    }
  }
`;

type Props ={
  scope: Scope;
  open: boolean;
  onClose?: () => void;
}

export default function AddFlagModal({ onClose, scope, ...props }: Props) {
  const [message, setMessage] = useState('');
  const [createFlag, { loading, called }] = useMutation<CreateFlag, CreateFlagVariables>(
    CREATE_FLAG,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createFlag({ variables: { scopeId: scope.id, message } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    if (!loading && called && onClose) {
      onClose();
    }
  }, [loading, called]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      afterClose={() => setMessage('')}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div className="flex flex-col h-full">
        <Typography variant="h4" className="text-2xl">
          Add Flag to
          {' '}
          <span className="italic">{scope.title}</span>
        </Typography>
        <form noValidate autoComplete="off" className="pt-8 flex-1 flex flex-col justify-between" onSubmit={handleSubmit}>
          <TextField
            size="small"
            color="secondary"
            label="Message"
            variant="outlined"
            multiline
            rowsMax={4}
            name="message"
            value={message}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className="text-white"
          >
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
}
