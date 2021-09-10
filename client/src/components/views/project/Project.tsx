import React, { useState } from 'react';

import {
  Button, IconButton, Paper, Typography, useMediaQuery, useTheme,
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import useDimensions from 'react-cool-dimensions';

import ErrorToast from '@/components/ErrorToast';
import LoadingIndicator from '@/components/LoadingIndicator';
import HillChart, { UpdatedItemsMap, VIEW_BOX } from '@/components/hillChart/HillChart';

import ScopeFilterDropdown from './ScopeFilterDropdown';
import ScopeSortDropdown from './ScopeSortDropdown';
import { FilterOption, Scopes, SortOption } from './helpers';
import PrintPreviewModal from './print/PrintPreviewModal';
import ScopeList from './scopeList/ScopeList';
import { ProjectPage_project as ProjectDetails } from './types/ProjectPage';

type Props = {
  project?: ProjectDetails | null;
  scopes: Scopes;
  scopeSortOption: SortOption;
  onScopeSortChange: (value: string) => void;
  scopeFilterOption: FilterOption;
  onScopeFilterChange: (value: string) => void;
  onHillChartSave: (items: UpdatedItemsMap) => void;
  onHillChartEditClick: () => void;
  onHillChartEditCancel: () => void;
  showError: boolean;
  onErrorToastDismiss: () => void;
  hillChartEditEnabled: boolean
  loading: boolean;
  moveScope: (scopeId: string, toIndex: number, moveComplete: boolean) => void;
}

export default function Project(props: Props) {
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const { observe: chartContainerRef, width } = useDimensions<HTMLDivElement | null>();

  const chartHeight = (VIEW_BOX.y / VIEW_BOX.x) * width;
  const {
    project,
    scopes,
    scopeSortOption,
    onScopeSortChange,
    scopeFilterOption,
    onScopeFilterChange,
    onHillChartSave,
    onHillChartEditClick,
    onHillChartEditCancel,
    showError,
    onErrorToastDismiss,
    hillChartEditEnabled,
    loading,
    moveScope,
  } = props;

  // TODO: Pass through _all_ scopes so that "print mode" still shows everything it's supposed to

  const drawerContent = (
    <div className="h-full p-4 flex items-center flex-col">
      <section className="flex flex-col">
        <ScopeSortDropdown sortOption={scopeSortOption} onChange={onScopeSortChange} />
        <ScopeFilterDropdown className="mt-2" filterOption={scopeFilterOption} onChange={onScopeFilterChange} />
      </section>
    </div>
  );

  const filterActive = scopeFilterOption.value !== 'none';

  return (
    <div className="h-full p-4 flex justify-center">
      <Paper className="h-full w-full p-4 flex flex-col items-center" style={{ maxWidth: 1600 }}>
        {!project || loading ? <LoadingIndicator /> : (
          <>
            <div
              className={`flex justify-center w-full pb-4 relative ${isMobile ? 'items-center h-full' : ''}`}
            >
              <div className="absolute top-8 left-8 z-10">
                {!hillChartEditEnabled && scopes.length > 0 && (
                  <Button
                    className="text-white"
                    variant="contained"
                    color="secondary"
                    onClick={onHillChartEditClick}
                  >
                    Update Progress
                  </Button>
                )}
                {!isMobile && !hillChartEditEnabled && (
                  <IconButton
                    className="ml-2 border border-solid border-gray-100 shadow-md"
                    aria-label="print"
                    onClick={() => setShowPrintPreview(true)}
                  >
                    <PhotoIcon className="text-secondary" />
                  </IconButton>
                )}
              </div>
              <div ref={chartContainerRef} style={{ width: isMobile ? '100%' : '80%', height: chartHeight }}>
                <HillChart
                  width="100%"
                  height="100%"
                  data={scopes}
                  allowEdit={hillChartEditEnabled}
                  onSave={onHillChartSave}
                  onCancel={onHillChartEditCancel}
                />
              </div>
            </div>
            {!isMobile && (
            <>
              <div className="w-full px-4 flex justify-between" style={{ maxWidth: 1200 }}>
                <Typography className="flex-grow self-end" variant="h6" component="h2">{project.title}</Typography>
                <IconButton
                  className={`border border-solid shadow-md mb-1 ${filterActive ? 'border-secondary bg-secondary' : 'border-gray-100'}`}
                  aria-label="sort and filter"
                  onClick={() => setOpenDrawer((v) => !v)}
                  size="small"
                  style={{ width: 32, height: 32 }}
                >
                  <FilterIcon className={`text-lg ${filterActive ? 'text-white' : 'text-secondary'}`} />
                </IconButton>
              </div>
              <ScopeList
                scopes={scopes}
                projectId={project.id}
                dragEnabled={scopeSortOption.allowDrag && scopeFilterOption.allowDrag}
                moveScope={moveScope}
                openDrawer={openDrawer}
                drawerContent={drawerContent}
                drawerEnabled={!isMobile}
              />
            </>
            )}
          </>
        )}
      </Paper>
      <ErrorToast open={showError} onClose={onErrorToastDismiss} />
      <PrintPreviewModal
        open={showPrintPreview}
        onClose={() => setShowPrintPreview(false)}
        projectName={project?.title || ''}
        scopes={scopes}
      />
    </div>
  );
}
