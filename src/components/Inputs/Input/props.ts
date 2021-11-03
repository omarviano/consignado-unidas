import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';

import { TextFieldProps } from '@mui/material/TextField';

export type InputProps = TextFieldProps & {
  name: string;
  label: string;
  value?: string;
  defaultValue?: string;
  mask?: string;
  icon?: ComponentType<IconBaseProps>;
  disabled?: boolean;
};
