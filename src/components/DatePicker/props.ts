import { DesktopDatePickerProps } from '@mui/lab/DesktopDatePicker';

export type DatePickerProps = Omit<
  DesktopDatePickerProps,
  'onChange' | 'renderInput'
> & {
  value?: string;
  name?: string;
};
