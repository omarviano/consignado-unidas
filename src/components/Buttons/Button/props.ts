import { ButtonProps as ButtonMaterialProps } from '@mui/material/Button';

export type ButtonProps = ButtonMaterialProps & {
  component?: string;
};
