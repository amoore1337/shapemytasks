import { Button } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import React, { useEffect, useState } from 'react';
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
    return () => { if (timeout) { clearTimeout(timeout); } };
  }, [copied]);

  return (
    <CopyToClipboard text={teamCode} onCopy={() => setCopied(true)}>
      <Button
        variant="outlined"
        className="mb-2"
        color="secondary"
        onMouseEnter={() => !copied && setButtonText(BUTTON_TEXTS.hover)}
        onMouseLeave={() => !copied && setButtonText(BUTTON_TEXTS.normal)}
        startIcon={!copied && <GroupAddIcon color="secondary" fontSize="large" />}
      >
        {buttonText}
      </Button>
    </CopyToClipboard>
  );
}
