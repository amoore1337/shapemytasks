import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { Button, Tooltip } from '@mui/material';
import tw, { styled } from 'twin.macro';

type Props = {
  activeSort: string;
  activeFilter: string;
  onClick: () => void;
  onClear: () => void;
  isActive: boolean;
}

const ClearButton = styled.button(
  tw`absolute rounded-full border border-solid border-red-600 bg-white flex items-center justify-center`,
  tw`hover:bg-red-600 hover:text-white text-red-600`,
  `
    width: 21px;
    height: 21px;
    top: -10px;
    right: -10px;
  `,
);

export default function SortComboButton({
  activeSort, activeFilter, onClick, onClear, isActive,
}: Props) {
  return (
    <div className="relative">
      <Button
        className={`border border-solid shadow-md mb-1 ${isActive ? 'border-blue-800 bg-primary' : 'border-gray-100'}`}
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
          <ClearButton
            type="button"
            onClick={onClear}
          >
            <CloseIcon className="text-xs text-inherit icon" />
          </ClearButton>
        </Tooltip>
      )}
    </div>
  );
}
