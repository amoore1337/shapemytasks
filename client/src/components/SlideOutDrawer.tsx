import React, { ReactNode, useEffect, useState } from 'react';

import { styled } from 'twin.macro';

const ANIMATION_DURATION = 0.3;

type Props = {
  open: boolean;
  width: number;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
};

const DrawerContainer = styled.div`
  transition: all ${ANIMATION_DURATION}s ease;
`;

let timeout: number;
export default function SlideOutDrawer({ open, width, onClose, className = '', children }: Props) {
  const [showContent, setShowContent] = useState(open);
  useEffect(() => {
    if (!open) {
      timeout = window.setTimeout(() => {
        setShowContent(open);
        if (onClose) {
          onClose();
        }
      }, ANIMATION_DURATION * 1000);
    } else {
      setShowContent(open);
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [open]);

  return (
    <DrawerContainer
      className={`relative min-h-full overflow-hidden ${className}`}
      style={{ width: open ? width : 0 }}
    >
      <div className="h-full overflow-auto" style={{ width }}>
        {showContent && children}
      </div>
    </DrawerContainer>
  );
}
