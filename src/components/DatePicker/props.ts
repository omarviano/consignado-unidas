import { KeyboardDatePickerProps } from '@material-ui/pickers';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type DatePickerProps = Optional<
  KeyboardDatePickerProps,
  'value' | 'onChange'
>;
