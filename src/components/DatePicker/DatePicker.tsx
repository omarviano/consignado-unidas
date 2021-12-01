import { forwardRef } from 'react';
import { useField } from 'formik';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { DatePickerProps } from './props';
import * as Styled from './styles';

const DatePicker = forwardRef<typeof DesktopDatePicker, DatePickerProps>(
  ({ value, name = 'name', ...rest }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta, helpers] = useField<Date | null>({
      name,
      value: value?.toString(),
    });

    return (
      <Styled.DatePicker
        ref={() => ref}
        {...field}
        value={field.value}
        onChange={value => helpers.setValue(value as Date)}
        inputFormat="dd/MM/yyyy"
        {...rest}
      />
    );
  },
);

export { DatePicker };
