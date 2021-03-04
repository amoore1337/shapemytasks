import {
  Modal, Backdrop, Fade, IconButton, ModalProps,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';

type Props = ModalProps & {
  noCloseButton?: boolean;
}
export default function StyledModal({
  open, onClose, children, style, noCloseButton, ...props
}: Props) {
  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={onClose}
      {...props}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableBackdropClick
    >
      <Fade in={open}>
        <div className="bg-white p-4 shadow text-gray-800 relative" style={style}>
          {!noCloseButton && (
            <IconButton onClick={() => onClose && onClose({}, 'backdropClick')} className="p-1 -mt-2 absolute right-1 top-3">
              <CancelIcon color="secondary" className="text-4xl" />
            </IconButton>
          )}
          {children}
        </div>
      </Fade>
    </Modal>
  );
}
