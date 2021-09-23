import React, { useEffect } from 'react';

import {
  Modal, Backdrop, Fade, IconButton, ModalProps,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { styled } from 'twin.macro';

const FADE_IN_TIMEOUT = 500;

const ModalContentContainer = styled.div`
  /* Don't use tailwind so that styles can easily be overwritten */
  background-color: white;
  padding: 1rem;
  border-radius: .25rem;
  position: relative;
`;

type Props = ModalProps & {
  noCloseButton?: boolean;
  afterOpen?: () => void;
  afterClose?: () => void;
}

let timeout: number;

export default function StyledModal({
  open, onClose, afterOpen, afterClose, children, style, noCloseButton, className = '', ...props
}: Props) {
  useEffect(() => {
    if (open && afterOpen) {
      timeout = window.setTimeout(afterOpen, FADE_IN_TIMEOUT);
    } else if (!open && afterClose) {
      timeout = window.setTimeout(afterClose, FADE_IN_TIMEOUT);
    }

    return () => {
      if (timeout) { window.clearTimeout(timeout); }
    };
  }, [open]);

  const handleClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) = (event, reason) => {
    if (reason === 'backdropClick') { return; }
    if (onClose) { onClose(event, reason); }
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={handleClose}
      {...props}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: FADE_IN_TIMEOUT,
      }}
    >
      <Fade in={open} timeout={FADE_IN_TIMEOUT}>
        <ModalContentContainer className={`shadow text-gray-800 ${className}`} style={style}>
          {!noCloseButton && (
            <IconButton onClick={() => onClose && onClose({}, 'backdropClick')} className="p-1 -mt-2 absolute right-1 top-3">
              <CancelIcon color="secondary" className="text-4xl" />
            </IconButton>
          )}
          {children}
        </ModalContentContainer>
      </Fade>
    </Modal>
  );
}
