import React, { useState } from 'react';

import { Button, TextField } from '@mui/material';

import useCreateScope from '@/api/mutations/useCreateScope';
import { getRandomColor } from '@/utils/color';

import DotColorPicker from './DotColorPicker';

type Props = {
  projectId: string;
}

export default function AddScope({ projectId }: Props) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState<string>(getRandomColor());
  const [showError, setShowError] = useState(false);
  const [createScope] = useCreateScope(projectId);

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
        <DotColorPicker selectedColor={color} onChange={setColor} />
        <TextField
          name="title"
          className="ml-2 w-full"
          value={title}
          onChange={handleChange}
          size="small"
          color="primary"
          label="Scope Title"
          variant="outlined"
        />
      </div>
      <div className="flex items-center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="text-white"
          disabled={!title}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
