import { forwardRef, useEffect } from 'react';
import { useField } from 'formik';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';

import { DatePickerProps } from './props';
import * as Styled from './styles';

const DatePicker = forwardRef<typeof DesktopDatePicker, DatePickerProps>(
  ({ value, name = 'name', ...rest }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta, helpers] = useField<Date | null>({
      name,
      value: value?.toString(),
    });

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
            <TextField id={`dateInput_${name}`} {...params} />
          )}
        />
      </Styled.Container>
    );
  },
);

export { DatePicker };
