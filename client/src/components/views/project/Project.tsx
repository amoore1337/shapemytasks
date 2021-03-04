import React from 'react';
import { useParams } from 'react-router-dom';

export default function Project() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="text-center p-8">
      Project page for
      {' '}
      {id}
    </div>
  );
}
