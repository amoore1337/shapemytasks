import React from 'react';

import { FormControl, InputLabel, Select } from '@material-ui/core';

import { SCOPE_SORT_OPTIONS, SortOption } from './helpers';

type Props = {
  sortOption: SortOption;
  onChange: (value: string) => void;
}

export default function ScopeSortDropdown({ sortOption, onChange }: Props) {
  return (
    <FormControl className="flex-shrink-0 pb-2" variant="outlined" color="secondary">
      <InputLabel htmlFor="scope-sort-input">Sort by</InputLabel>
      <Select
        native
        label="Sort by"
        value={sortOption.value}
        onChange={(event) => onChange(event.target.value as string)}
        classes={{ select: 'py-3' }}
        inputProps={{ name: 'age', id: 'scope-sort-input', className: 'text-sm leading-4' }}
      >
        {SCOPE_SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </Select>
    </FormControl>
  );
}
