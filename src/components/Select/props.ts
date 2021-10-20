import { TextFieldProps } from '@material-ui/core/TextField';

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
