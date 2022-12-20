import React, { useEffect, useState } from 'react';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Button } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const BUTTON_TEXTS = {
  normal: 'Invite Teammate',
  hover: 'Copy Code!',
  success: 'Copied!',
};

export default function TeamCodeCopyButton({ teamCode }: { teamCode: string }) {
  const [buttonText, setButtonText] = useState(BUTTON_TEXTS.normal);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeout: number;
    if (copied) {
      setButtonText(BUTTON_TEXTS.success);
      timeout = window.setTimeout(() => setCopied(false), 800);
    } else {
      setButtonText(BUTTON_TEXTS.normal);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [copied]);

  return (
    <CopyToClipboard text={teamCode} onCopy={() => setCopied(true)}>
      <Button
        variant="outlined"
        className="mb-2 w-full"
        color="primary"
        onMouseEnter={() => !copied && setButtonText(BUTTON_TEXTS.hover)}
        onMouseLeave={() => !copied && setButtonText(BUTTON_TEXTS.normal)}
        startIcon={!copied && <GroupAddIcon color="primary" fontSize="large" />}
      >
        {buttonText}
      </Button>
    </CopyToClipboard>
  );
}
