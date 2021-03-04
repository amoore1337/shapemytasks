import { CircularProgress } from '@material-ui/core';
import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center my-4">
      <CircularProgress color="secondary" />
    </div>
  );
}
