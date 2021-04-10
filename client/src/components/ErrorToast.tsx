import React, { useState } from 'react';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

type Props = {
  open?: boolean;
  duration?: number;
  onClose?: () => void;
  message?: string;
}

export default function ErrorToast({
  open = true, duration = 6000, onClose, message,
}: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(open);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setSnackbarOpen(false);
    }
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {message || 'Oops! Something went wrong, please try again.'}
      </Alert>
    </Snackbar>
  );
}
