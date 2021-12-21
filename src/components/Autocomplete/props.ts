import { TextFieldProps } from '@mui/material/TextField';

export interface OptionType {
  name: string;
  value?: string;
}

export type AutocompleteProps = TextFieldProps & {
  name: string;
  label?: string;
  options: OptionType[];
  value?: string;
};
