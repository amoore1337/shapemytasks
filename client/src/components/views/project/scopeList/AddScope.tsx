import React, { useState } from 'react';

import { Button, TextField } from '@material-ui/core';
import { Color } from '@svgdotjs/svg.js';

import useCreateScope from '@/api/mutations/useCreateScope';

import ScopeDot from './ScopeDot';

type Props = {
  projectId: string;
  createScope?: (projectId: string, title: string, color: string) => Promise<void>;
}

export default function AddScope({ projectId, createScope }: Props) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<string>(getRandomColor());
  const [showError, setShowError] = useState(false);
  const [submitScope] = useCreateScope(projectId);

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
    if (createScope) {
      await createScope(projectId, title, color);
    } else {
      await submitScope({ variables: { projectId, title, color } });
    }
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
