import ErrorToast from '@/components/ErrorToast';
import type { ChartItem } from '@/components/hillChart/helpers';
import type { UpdatedItemsMap } from '@/components/hillChart/HillChart';
import HillChart, { VIEW_BOX } from '@/components/hillChart/HillChart';
import LoadingIndicator from '@/components/LoadingIndicator';
import type { Project as ProjectDetails } from '@/models/types';
import PhotoIcon from '@mui/icons-material/PhotoCamera';
import { Button, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import { Helmet } from 'react-helmet';
import type { FilterOption, Scopes, SortOption } from './helpers';
import { SCOPE_FILTER_OPTIONS, SCOPE_SORT_OPTIONS } from './helpers';
import PrintPreviewModal from './print/PrintPreviewModal';
import ScopeFilterDropdown from './ScopeFilterDropdown';
import ScopeList from './scopeList/ScopeList';
import ScopeSortDropdown from './ScopeSortDropdown';
import SortComboButton from './SortComboButton';

type Props = {
  project?: ProjectDetails | null;
  allScopes: Scopes;
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
  hillChartEditEnabled: boolean;
  loading: boolean;
  moveScope: (scopeId: string, toIndex: number, moveComplete: boolean) => void;
};

export default function Project(props: Props) {
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [chartPoints, setChartPoints] = useState<(ChartItem | null)[]>([]);
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const { observe: chartContainerRef, width } = useDimensions<HTMLDivElement | null>();

  const chartHeight = (VIEW_BOX.y / VIEW_BOX.x) * width;
  const {
    project,
    allScopes,
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

  useEffect(() => {
    const points = scopes.map((scope) => {
      if (!scope) {
        return null;
      }
      return {
        id: scope.id,
        progress: scope.progress,
        color: scope.color,
        title: (
          <span
            className={`${scope.flag ? 'font-medium text-danger' : ''} ${
              scope.niceToHave ? 'italic' : ''
            }`}
          >
            {scope.title}
          </span>
        ),
      };
    });
    setChartPoints(points);
  }, [scopes]);

  const resetFilterAndSort = () => {
    onScopeSortChange(SCOPE_SORT_OPTIONS[0].value);
    onScopeFilterChange(SCOPE_FILTER_OPTIONS[0].value);
    setOpenDrawer(false);
  };

  const drawerContent = (
    <div className="flex h-full flex-col items-center p-4">
      <section className="flex flex-col">
        <ScopeSortDropdown sortOption={scopeSortOption} onChange={onScopeSortChange} />
        <ScopeFilterDropdown
          className="mt-2"
          filterOption={scopeFilterOption}
          onChange={onScopeFilterChange}
        />
      </section>
    </div>
  );

  const filterActive = scopeFilterOption.value !== SCOPE_FILTER_OPTIONS[0].value;
  const sortActive = scopeSortOption.value !== SCOPE_SORT_OPTIONS[0].value;

  return (
    <div className="flex h-full justify-center p-4">
      {project && (
        <Helmet>
          <title>{project?.title}</title>
          <meta
            name="description"
            content={
              project?.description ||
              `Tracking progress of ${allScopes?.length || 0} scope(s) on ${project?.title}`
            }
          />
          <meta name="og:url" content={window.location.href} />
          <meta name="og:title" content={project.title || ''} />
          <meta
            name="og:description"
            content={
              project?.description ||
              `Tracking progress of ${allScopes?.length || 0} scope(s) on ${project?.title}`
            }
          />
        </Helmet>
      )}
      <Paper className="flex h-full w-full flex-col items-center p-4" style={{ maxWidth: 1600 }}>
        {!project || loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div
              className={`relative flex w-full justify-center pb-4 ${
                isMobile ? 'h-full items-center' : ''
              }`}
            >
              <div className="absolute top-8 left-8 z-10">
                {!hillChartEditEnabled && scopes.length > 0 && (
                  <Button variant="primary" color="primary" onClick={onHillChartEditClick}>
                    Update Progress
                  </Button>
                )}
                {!isMobile && !hillChartEditEnabled && (
                  <IconButton
                    className="ml-2 border border-solid border-gray-100"
                    aria-label="print"
                    onClick={() => setShowPrintPreview(true)}
                  >
                    <PhotoIcon className="text-secondary" />
                  </IconButton>
                )}
              </div>
              <div
                ref={chartContainerRef}
                style={{ width: isMobile ? '100%' : '80%', height: chartHeight }}
              >
                <HillChart
                  width="100%"
                  height="100%"
                  data={chartPoints}
                  allowEdit={hillChartEditEnabled}
                  onSave={onHillChartSave}
                  onCancel={onHillChartEditCancel}
                />
              </div>
            </div>
            {!isMobile && (
              <>
                <div className="flex w-full justify-between px-4" style={{ maxWidth: 1200 }}>
                  <Typography className="flex-grow self-end" variant="h6" component="h2">
                    {project.title}
                  </Typography>
                  {!loading && (
                    <SortComboButton
                      activeSort={scopeSortOption.label}
                      activeFilter={scopeFilterOption.label}
                      onClick={() => setOpenDrawer((v) => !v)}
                      onClear={resetFilterAndSort}
                      isActive={sortActive || filterActive}
                    />
                  )}
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
        scopes={allScopes}
      />
    </div>
  );
}
