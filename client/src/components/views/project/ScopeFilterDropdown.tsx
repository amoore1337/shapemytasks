import { FormControl, InputLabel, Select } from '@mui/material';

import { FilterOption, SCOPE_FILTER_OPTIONS } from './helpers';

type Props = {
  filterOption: FilterOption | null;
  onChange: (value: string) => void;
  className?: string;
};

export default function ScopeFilterDropdown({ filterOption, onChange, className = '' }: Props) {
  return (
    <FormControl className={`flex-shrink-0 pb-2 ${className}`} variant="outlined" color="primary">
      <InputLabel htmlFor="scope-filter-input">Filter by</InputLabel>
      <Select
        native
        label="Filter by"
        value={filterOption?.value}
        onChange={(event) => onChange(event.target.value as string)}
        classes={{ select: 'py-3' }}
        inputProps={{ name: 'age', id: 'scope-filter-input', className: 'text-sm leading-4' }}
      >
        {SCOPE_FILTER_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
