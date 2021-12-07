import React, { useCallback } from 'react';
import { useField } from 'formik';
import MUIAutocomplete, {
  createFilterOptions,
} from '@mui/material/Autocomplete';

import { Box } from '@mui/material';

import * as Styled from './styles';
import { AutocompleteProps, OptionType } from './props';

const Autocomplete: React.FC<AutocompleteProps> = React.memo(
  ({ name, label, options, value, ...rest }) => {
    const [field, meta, helpers] = useField<string | undefined>({
      name,
      value,
    });

    const filterOptions = createFilterOptions({
      matchFrom: 'any',
      stringify: (option: OptionType) => option.name,
      trim: true,
    });

    const renderOption = (props: any, option: OptionType) => (
      <Box component="li" {...props}>
        {option.name}
      </Box>
    );

    const handleChange = useCallback(
      (_, selectedValue: OptionType | null) => {
        helpers.setValue(selectedValue?.value);
      },
      [helpers],
    );

    return (
      <>
        <Styled.Label isError={!!meta.error && meta.touched}>
          {label}
        </Styled.Label>
        <MUIAutocomplete
          filterOptions={filterOptions}
          options={options}
          getOptionLabel={(option: OptionType) => option.name}
          renderOption={renderOption}
          onChange={handleChange}
          renderInput={params => (
            <Styled.TextField
              {...params}
              {...rest}
              {...field}
              error={!!meta.error && meta.touched}
              helperText={meta.touched ? meta.error : undefined}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </>
    );
  },
);

export { Autocomplete };
