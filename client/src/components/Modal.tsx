import { useEffect } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { Backdrop, Fade, Modal, ModalProps } from '@mui/material';
import { styled } from 'twin.macro';

const FADE_IN_TIMEOUT = 500;

const ModalContentContainer = styled.div`
  /* Don't use tailwind so that styles can easily be overwritten */
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  position: relative;
`;

type Props = ModalProps & {
  noCloseButton?: boolean;
  afterOpen?: () => void;
  afterClose?: () => void;
};

let timeout: number;

export default function StyledModal({
  open,
  onClose,
  afterOpen,
  afterClose,
  children,
  style,
  noCloseButton,
  className = '',
  ...props
}: Props) {
  useEffect(() => {
    if (open && afterOpen) {
      timeout = window.setTimeout(afterOpen, FADE_IN_TIMEOUT);
    } else if (!open && afterClose) {
      timeout = window.setTimeout(afterClose, FADE_IN_TIMEOUT);
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [open]);

  const handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void = (
    event,
    reason
  ) => {
    if (reason === 'backdropClick') {
      return;
    }
    if (onClose) {
      onClose(event, reason);
    }
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
        <ModalContentContainer className={`text-gray-800 shadow ${className}`} style={style}>
          {!noCloseButton && (
            <button
              type="button"
              onClick={() => onClose && onClose({}, 'backdropClick')}
              className="absolute right-1 top-3 -mt-2 p-1"
            >
              <CancelIcon color="secondary" className="text-4xl text-primary" />
            </button>
          )}
          {children}
        </ModalContentContainer>
      </Fade>
    </Modal>
  );
}
