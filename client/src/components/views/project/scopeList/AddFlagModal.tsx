import React, { useEffect, useState } from 'react';

import { Button, TextField, Typography } from '@mui/material';

import Modal from '@/components/Modal';
import { useCreateFlag } from '@/models/flag';

import type { ProjectScope } from '../helpers';

type Props = {
  scope: ProjectScope;
  open: boolean;
  onClose?: () => void;
};

export default function AddFlagModal({ onClose, scope, ...props }: Props) {
  const [message, setMessage] = useState('');
  const [createFlag, { loading, called }] = useCreateFlag();

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
  }, [loading, called, onClose]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      afterClose={() => setMessage('')}
      style={{
        width: '60%',
        maxWidth: 400,
        maxHeight: 500,
      }}
    >
      <div className="flex h-full flex-col">
        <Typography variant="h4" className="text-2xl">
          Add Flag to <span className="italic">{scope.title}</span>
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className="flex flex-1 flex-col justify-between pt-8"
          onSubmit={handleSubmit}
        >
          <TextField
            size="small"
            color="primary"
            label="Note (Optional)"
            variant="outlined"
            multiline
            maxRows={4}
            name="message"
            value={message}
            onChange={handleChange}
            autoFocus
          />
          <Button type="submit" variant="primary" className="mt-4">
            Add Flag
          </Button>
        </form>
      </div>
    </Modal>
  );
}
