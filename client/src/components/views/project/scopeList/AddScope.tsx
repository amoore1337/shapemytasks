import { gql, useMutation } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { addCacheItem } from '../../../../cacheUtils';
import { CreateScope, CreateScopeVariables } from './types/CreateScope';

const CREATE_SCOPE = gql`
  mutation CreateScope($title: String!, $description: String, $color: String, $projectId: ID!) {
    createScope(title: $title, description: $description, color: $color, projectId: $projectId) {
      id
      title
      description
      color
      progress
    }
  }
`;

type Props = {
  projectId: string;
}

export default function AddScope({ projectId }: Props) {
  const [title, setTitle] = useState('');
  const [showError, setShowError] = useState(false);
  const [createScope] = useMutation<CreateScope, CreateScopeVariables>(
    CREATE_SCOPE,
    addCacheItem<CreateScope, CreateScopeVariables>('scopes', 'createScope', `Project:${projectId}`),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (showError && event.target.value) {
      setShowError(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setShowError(true);
    }
    await createScope({ variables: { projectId, title } });
    setTitle('');
  };

  return (
    <form noValidate autoComplete="off" className="flex justify-between" onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={title}
        onChange={handleChange}
        size="small"
        color="secondary"
        label="Task Title"
        variant="outlined"
        error={showError}
        helperText={showError && 'Please provide a title for the task.'}
      />
      <div>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="text-white"
          disabled={false}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
