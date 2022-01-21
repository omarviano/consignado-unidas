import { forwardRef, useEffect, useMemo } from 'react';
import { useField } from 'formik';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';

import { DatePickerProps } from './props';
import * as Styled from './styles';

const DatePicker = forwardRef<typeof DesktopDatePicker, DatePickerProps>(
  ({ value, name = 'name', ...rest }, ref) => {
    const [field, meta, helpers] = useField<Date | null>({
      name,
      value: value?.toString(),
    });

    const errors = useMemo(() => {
      if (meta.initialError) {
        return {
          error: true,
          helperText: meta.initialError,
        };
      }

      if (meta.error && meta.touched) {
        return {
          error: true,
          helperText: meta.error,
        };
      }

      return {};
    }, [meta.error, meta.initialError, meta.touched]);

    useEffect(() => {
      const input = document.getElementById(
        `dateInput_${name}`,
      ) as HTMLInputElement;

      if (input) input.placeholder = 'DD/MM/AAAA';
    }, [name]);

    return (
      <Styled.Container>
        <Styled.DatePicker
          ref={() => ref}
          {...field}
          value={field.value || null}
          onChange={value => helpers.setValue(value as Date)}
          InputProps={{
            style: {
              borderRadius: 8,
              height: 38,
            },
          }}
          cancelText="Cancelar"
          {...rest}
          renderInput={params => (
            <TextField
              id={`dateInput_${name}`}
              data-testid={`date-picker_${name}`}
              {...field}
              {...params}
              {...errors}
            />
          )}
        />
      </Styled.Container>
    );
  },
);

export { DatePicker };
