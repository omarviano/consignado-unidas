import React, { FC, useMemo, useRef, useCallback } from 'react';
import { useField } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';

import { SelectProps, OptionSelectType } from './props';
import * as Styled from './styles';

const Select: FC<SelectProps> = React.memo(
  ({ name, label, options, value, ...rest }) => {
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
      (event: React.ChangeEvent<{ value: string }>) => {
        helpers.setValue(event.target.value);
        field.onChange(event);
      },
      [field, helpers],
    );

    return (
      <Styled.Select
        {...field}
        placeholder={label}
        fullWidth
        select
        label={label}
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
      >
        {optionsMap}
      </Styled.Select>
    );
  },
);

export { Select };
