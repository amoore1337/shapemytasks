import React, {
  CSSProperties, ForwardedRef, forwardRef, useRef,
  Ref,
} from 'react';

import { Button } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp';
import { exportComponentAsPNG } from 'react-component-export-image';
import useDimensions from 'react-cool-dimensions';

import Modal from '@/components/Modal';
import HillChart, { VIEW_BOX } from '@/components/hillChart/HillChart';

import { Scopes, sortScopesByPosition, sortScopesByUpdatedAt } from '../helpers';

import MiniScopeList from './MiniScopeList';

type Props = {
  open: boolean;
  onClose: () => void;
  scopes: Scopes;
  style?: CSSProperties;
}

const PrintableContent = forwardRef<HTMLDivElement, ContentProps>((props, ref) => (
  <ModalContent {...props} forwardedRef={ref} />
));

export default function PrintPreviewModal({
  open, onClose, scopes, style,
}: Props) {
  const printableContentRef = useRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>;

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{ width: '95%', height: '95%', ...style }}
      noCloseButton
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 relative overflow-y-auto">
          <PrintableContent scopes={scopes} ref={printableContentRef as Ref<HTMLDivElement>} />
        </div>
        <div className="pt-6 flex justify-center items-center">
          <Button
            variant="contained"
            color="secondary"
            className="text-white mr-4"
            startIcon={<DownloadIcon className="text-white" />}
            onClick={() => exportComponentAsPNG(printableContentRef)}
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
  scopes: Scopes;
  forwardedRef?: ForwardedRef<HTMLDivElement>;
};

function ModalContent({ scopes, forwardedRef }: ContentProps) {
  const { observe: chartContainerRef, width } = useDimensions<HTMLDivElement | null>();

  const chartHeight = (VIEW_BOX.y / VIEW_BOX.x) * width;
  const scopeBuckets = sortedScopes(scopes);

  const nextUpScopes = sortScopesByPosition(scopeBuckets.notStarted);
  const finishedScopes = sortScopesByUpdatedAt(scopeBuckets.completed);

  return (
    <div ref={forwardedRef} className="flex flex-col h-full w-full">
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
