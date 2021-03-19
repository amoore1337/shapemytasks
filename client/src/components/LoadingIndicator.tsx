import React from 'react';

import { CircularProgress } from '@material-ui/core';

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center my-4">
      <CircularProgress color="secondary" />
    </div>
  );
}
