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
};

const ClearButton = styled.button(
  tw`absolute rounded-full border border-solid border-red-600 flex items-center justify-center`,
  tw`hover:text-white text-red-600`,
  `
    width: 21px;
    height: 21px;
    top: -10px;
    right: -10px;
  `
);

export default function SortComboButton({
  activeSort,
  activeFilter,
  onClick,
  onClear,
  isActive,
}: Props) {
  return (
    <div className="relative">
      <Button
        className={`mb-1 border border-solid shadow-md ${
          isActive ? 'border-blue-800 bg-primary' : 'border-gray-100'
        }`}
        aria-label="sort and filter"
        onClick={onClick}
        endIcon={<FilterIcon className={`${isActive ? 'text-white' : 'text-secondary'}`} />}
      >
        <div
          className={`mr-1 text-left text-sm normal-case ${
            isActive ? 'text-white' : 'text-gray-600'
          }`}
        >
          <div>Sort: {activeSort}</div>
          <div>Filter: {activeFilter}</div>
        </div>
      </Button>
      {isActive && (
        <Tooltip title="Clear" placement="top" arrow>
          <ClearButton type="button" onClick={onClear} className="bg-white hover:bg-red-600">
            <CloseIcon className="icon text-xs text-inherit" />
          </ClearButton>
        </Tooltip>
      )}
    </div>
  );
}
