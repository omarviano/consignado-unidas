import { CustomThemeProps } from 'styled-components';

import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  type PaletteOptions = CustomThemeProps;

  interface Palette extends createPalette.Palette, CustomThemeProps {}
}
