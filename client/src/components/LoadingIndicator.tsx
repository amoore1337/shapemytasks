import { CircularProgress } from '@mui/material';

export default function LoadingIndicator() {
  return (
    <div className="my-4 flex justify-center">
      <CircularProgress color="primary" />
    </div>
  );
}
