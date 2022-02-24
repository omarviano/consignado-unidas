import React, { FC, useMemo, useRef, useCallback } from 'react';
import { useField } from 'formik';
import MenuItem from '@mui/material/MenuItem';

import { SelectProps, OptionSelectType } from './props';
import * as Styled from './styles';

const Select: FC<SelectProps> = React.memo(
  ({ name, label, options, value, onChange, ...rest }) => {
    const inputRef = useRef(null);
    const [field, meta, helpers] = useField<string>({ name, value });

    const optionsMap = useMemo(
      () =>
        options.map((item: OptionSelectType) => (
          <MenuItem value={item.value} key={item.value}>
            {item.name}
          </MenuItem>
        )),
      [options],
    );

    const handleChange = useCallback(
      event => {
        helpers.setValue(event.target.value);
        field.onChange(event);

        if (onChange) onChange(event);
      },
      [field, helpers, onChange],
    );

    return (
      <>
        <Styled.Label isError={!!meta.error && meta.touched}>
          {label}
        </Styled.Label>
        <Styled.Select
          {...field}
          data-testid="select"
          placeholder={label}
          fullWidth
          select
          variant="outlined"
          inputRef={inputRef}
          id={name}
          name={field.name}
          value={field.value}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          {...rest}
          error={!!meta.error && meta.touched}
          helperText={meta.touched ? meta.error : undefined}
          SelectProps={{
            id: 'select',
          }}
        >
          {optionsMap}
        </Styled.Select>
      </>
    );
  },
);

export { Select };
