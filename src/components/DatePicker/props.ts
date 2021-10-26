import { DesktopDatePickerProps } from '@material-ui/lab/DesktopDatePicker';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type DatePickerProps = Optional<DesktopDatePickerProps, 'onChange'> & {
  value?: string;
  name?: string;
};
