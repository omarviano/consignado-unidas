import { TextFieldProps } from '@mui/material/TextField';

export interface OptionSelectType {
  name: string;
  value: string;
}

export type SelectProps = TextFieldProps & {
  name: string;
  label?: string;
  options: OptionSelectType[];
  value?: string;
};
