import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';
import { Color } from '@svgdotjs/svg.js';

import { addCacheItem } from '@/utils/cache';

import { SCOPE_FRAGMENT } from '../helpers';

import ScopeDot from './ScopeDot';
import { CreateScope, CreateScopeVariables } from './types/CreateScope';

const CREATE_SCOPE = gql`
  mutation CreateScope($title: String!, $description: String, $color: String, $projectId: ID!) {
    createScope(title: $title, description: $description, color: $color, projectId: $projectId) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

type Props = {
  projectId: string;
}

export default function AddScope({ projectId }: Props) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<string>(getRandomColor());
  const [showError, setShowError] = useState(false);
  const [createScope] = useMutation<CreateScope, CreateScopeVariables>(
    CREATE_SCOPE,
    { update: (cache, { data: result }) => addCacheItem<CreateScope>(cache, result, 'scopes', 'createScope', `Project:${projectId}`) },
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
      return;
    }
    await createScope({ variables: { projectId, title, color } });
    setTitle('');
    setColor(getRandomColor());
  };

  return (
    <form noValidate autoComplete="off" className="flex justify-between" onSubmit={handleSubmit}>
      <div className="flex items-center w-2/3 pl-6">
        <ScopeDot color={color} className="flex-shrink-0" />
        <TextField
          name="title"
          className="ml-2 w-full"
          value={title}
          onChange={handleChange}
          size="small"
          color="secondary"
          label="Scope Title"
          variant="outlined"
        />
      </div>
      <div className="flex items-center">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="text-white"
          disabled={!title}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

function getRandomColor() {
  return (Color as any).random().toHex();
}
