import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';

import { TextFieldProps } from '@material-ui/core';

export type InputOutlinedProps = TextFieldProps & {
  name: string;
  label: string;
  value?: string;
  defaultValue?: string;
  mask?: string;
  icon?: ComponentType<IconBaseProps>;
  disabled?: boolean;
};
