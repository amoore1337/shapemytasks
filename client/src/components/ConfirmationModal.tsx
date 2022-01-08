import React, { CSSProperties } from 'react';

import { Button, Typography } from '@mui/material';

import Modal from './Modal';

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  text?: string;
  style?: CSSProperties
  confirmText?: string;
  cancelText?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}
export default function ConfirmationModal({
  open, onConfirm, onCancel, style, ...content
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      style={{ maxWidth: 450, ...style }}
      noCloseButton
    >
      <div className="flex flex-col h-full">
        <Typography variant="h4">{content.title}</Typography>
        {content.text && (
          <Typography variant="subtitle1">{content.text}</Typography>
        )}
        <div className="flex justify-end">
          <Button
            variant="outlined"
            className={`${content.cancelButtonClassName || ''} mr-3`}
            color="inherit"
            onClick={onCancel}
          >
            {content.cancelText || 'Cancel'}
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            className={content.confirmButtonClassName}
            color="inherit"
          >
            {content.confirmText || 'Confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
