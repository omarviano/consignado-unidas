import { ButtonProps as ButtonMaterialProps } from '@material-ui/core/Button';

export type ButtonProps = ButtonMaterialProps & {
  component?: string;
};
