import { ButtonProps as ButtonMaterialProps } from '@mui/material/Button';

export type SubmitButtonProps = ButtonMaterialProps & {
  component?: string;
};
