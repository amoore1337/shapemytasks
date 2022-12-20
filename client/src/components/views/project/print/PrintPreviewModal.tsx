import { CSSProperties, useState, useEffect } from 'react';

import DownloadIcon from '@mui/icons-material/GetApp';
import { Button } from '@mui/material';
import { toPng } from 'html-to-image';
import useDimensions from 'react-cool-dimensions';

import Modal from '@/components/Modal';
import HillChart, { VIEW_BOX } from '@/components/hillChart/HillChart';

import {
  Scopes,
  sortScopesByClosedAt,
  sortScopesByPosition,
  sortScopesByProgressDesc,
} from '../helpers';

import MiniScopeList from './MiniScopeList';

const TRUNCATED_LIST_LENGTH = 3;

type Props = {
  open: boolean;
  onClose: () => void;
  projectName: string;
  scopes: Scopes;
  style?: CSSProperties;
};

export default function PrintPreviewModal({ open, onClose, projectName, scopes, style }: Props) {
  const [imageSrc, setImageSrc] = useState('');

  const handlePrint = async () => {
    const content = document.getElementById('print-content');
    if (!content) {
      return;
    }
    const dataUrl = await toPng(content);
    setImageSrc(dataUrl);
  };

  useEffect(() => {
    handlePrint();
  }, [scopes]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ width: '100%', height: '100%', ...style }}
      className="rounded-none p-0"
      afterOpen={handlePrint}
      noCloseButton
    >
      <div className="flex h-full flex-col">
        <div className="relative flex-1 overflow-y-auto">
          <ModalContent id="print-content" projectName={projectName} scopes={scopes} />
        </div>
        <div className="flex items-center justify-center pt-6 pb-4">
          <Button
            component="a"
            variant="primary"
            className="mr-4"
            startIcon={<DownloadIcon className="text-white" />}
            href={imageSrc}
            download={`${projectName}.png`}
          >
            Download PNG
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

type ContentProps = {
  id: string;
  projectName: string;
  scopes: Scopes;
};

function ModalContent({ id, projectName, scopes }: ContentProps) {
  const { observe: chartContainerRef, width } = useDimensions<HTMLDivElement | null>();

  const chartHeight = (VIEW_BOX.y / VIEW_BOX.x) * width;
  const scopeBuckets = sortedScopes(scopes);

  const inProgressScopes = sortScopesByProgressDesc(scopeBuckets.inProgress);
  const nextUpScopes = sortScopesByPosition(scopeBuckets.notStarted);
  const finishedScopes = sortScopesByClosedAt(scopeBuckets.completed);

  return (
    <div id={id} className="relative flex h-full w-full flex-col bg-white p-4">
      <h1 className="absolute left-8 mt-4 text-lg font-semibold">{projectName}</h1>
      <div ref={chartContainerRef} className="my-4 w-full" style={{ height: chartHeight }}>
        <HillChart width="100%" height="100%" data={scopeBuckets.inProgress} printMode />
      </div>
      <div className="relative flex-1">
        <div className="flex h-full px-4">
          <MiniScopeList title="In Progress" className="flex-1" scopes={inProgressScopes} />
          <div className="flex-1">
            <MiniScopeList
              title={
                <>
                  Next Up
                  <span className="ml-1 text-sm italic text-gray-600">(next 3 scopes)</span>
                </>
              }
              scopes={[...nextUpScopes].slice(0, TRUNCATED_LIST_LENGTH)}
            />
            <MiniScopeList
              title={
                <>
                  Recently Finished
                  <span className="ml-1 text-sm italic text-gray-600">
                    (last 3 scopes completed)
                  </span>
                </>
              }
              className="mt-6"
              scopes={[...finishedScopes].slice(0, TRUNCATED_LIST_LENGTH)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function sortedScopes(scopes: Scopes) {
  const sorted = {
    notStarted: [] as Scopes,
    inProgress: [] as Scopes,
    completed: [] as Scopes,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const scope of scopes) {
    if (!scope) {
      continue;
    }

    if (scope.progress < 1) {
      sorted.notStarted.push(scope);
    } else if (scope.progress > 99) {
      sorted.completed.push(scope);
    } else {
      sorted.inProgress.push(scope);
    }
  }
  return sorted;
}
