import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { Button, Tooltip } from '@mui/material';

type Props = {
  activeSort: string;
  activeFilter: string;
  onClick: () => void;
  onClear: () => void;
  isActive: boolean;
}

export default function SortComboButton({
  activeSort, activeFilter, onClick, onClear, isActive,
}: Props) {
  return (
    <div className="relative">
      <Button
        className={`border border-solid shadow-md mb-1 ${isActive ? 'border-secondary bg-secondary' : 'border-gray-100'}`}
        aria-label="sort and filter"
        onClick={onClick}
        endIcon={<FilterIcon className={`${isActive ? 'text-white' : 'text-secondary'}`} />}
      >
        <div className={`normal-case text-sm text-left mr-1 ${isActive ? 'text-white' : 'text-gray-600'}`}>
          <div>
            Sort:
            {' '}
            {activeSort}
          </div>
          <div>
            Filter:
            {' '}
            {activeFilter}
          </div>
        </div>
      </Button>
      {isActive && (
        <Tooltip title="Clear" placement="top" arrow>
          <button
            type="button"
            onClick={onClear}
            className="absolute rounded-full border border-solid border-red-600 bg-white flex items-center justify-center"
            style={{
              width: 21, height: 21, top: -10, right: -10,
            }}
          >
            <CloseIcon className="text-red-600 text-xs" />
          </button>
        </Tooltip>
      )}
    </div>
  );
}
