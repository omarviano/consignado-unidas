import { forwardRef } from 'react';
import { useField } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { DatePickerProps } from './props';
import * as Styled from './styles';

const DatePicker = forwardRef<typeof KeyboardDatePicker, DatePickerProps>(
  (
    {
      name = 'name',
      value,
      format = 'dd/MM/yyyy',
      variant = 'dialog',
      todayLabel = 'Hoje',
      cancelLabel = 'Cancelar',
      clearable = false,
      inputVariant = 'outlined',
      placeholder = 'DD/MM/YYYY',
      ...rest
    },
    ref,
  ) => {
    const [field, meta, helpers] = useField<Date | null>({
      name,
      value: value?.toString(),
    });

    return (
      <Styled.DatePicker
        ref={() => ref}
        {...field}
        name={field.name}
        value={field.value}
        onChange={value => helpers.setValue(value)}
        placeholder={placeholder}
        format={format}
        variant={variant}
        todayLabel={todayLabel}
        cancelLabel={cancelLabel}
        clearable={clearable}
        inputVariant={inputVariant}
        error={!!meta.error && meta.touched}
        helperText={meta.touched ? meta.error : undefined}
        {...rest}
      />
    );
  },
);

export { DatePicker };
