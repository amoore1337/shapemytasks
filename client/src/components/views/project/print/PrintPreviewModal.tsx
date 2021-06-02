import React, {
  CSSProperties,
  useState,
  useEffect,
} from 'react';

import { Button } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp';
import { toPng } from 'html-to-image';
import useDimensions from 'react-cool-dimensions';

import Modal from '@/components/Modal';
import HillChart, { VIEW_BOX } from '@/components/hillChart/HillChart';

import { Scopes, sortScopesByPosition, sortScopesByUpdatedAt } from '../helpers';

import MiniScopeList from './MiniScopeList';

type Props = {
  open: boolean;
  onClose: () => void;
  projectName: string;
  scopes: Scopes;
  style?: CSSProperties;
}

export default function PrintPreviewModal({
  open, onClose, projectName, scopes, style,
}: Props) {
  const [imageSrc, setImageSrc] = useState('');

  const handlePrint = async () => {
    const content = document.getElementById('print-content');
    if (!content) { return; }
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
      <div className="flex flex-col h-full">
        <div className="flex-1 relative overflow-y-auto">
          <ModalContent id="print-content" projectName={projectName} scopes={scopes} />
        </div>
        <div className="pt-6 pb-4 flex justify-center items-center">
          <Button
            component="a"
            variant="contained"
            color="secondary"
            className="text-white mr-4"
            startIcon={<DownloadIcon className="text-white" />}
            href={imageSrc}
            download="test.png"
          >
            Download PNG
          </Button>
          <Button variant="outlined" onClick={onClose}>Close</Button>
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

  const nextUpScopes = sortScopesByPosition(scopeBuckets.notStarted);
  const finishedScopes = sortScopesByUpdatedAt(scopeBuckets.completed);

  return (
    <div id={id} className="flex flex-col h-full w-full p-4 relative">
      <h1 className="absolute left-8 font-semibold text-lg">{projectName}</h1>
      <div ref={chartContainerRef} className="w-full mb-4" style={{ height: chartHeight }}>
        <HillChart
          width="100%"
          height="100%"
          data={scopeBuckets.inProgress}
          printMode
        />
      </div>
      <div className="flex-1 relative">
        <div className="flex h-full px-4">
          <MiniScopeList
            title="Next Up"
            className="flex-1 px-6"
            scopes={[...nextUpScopes].slice(0, 3)}
          />
          <MiniScopeList
            title="Recently Finished"
            className="flex-1 px-6"
            scopes={[...finishedScopes].slice(0, 3)}
          />
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
    if (!scope) { continue; }

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
