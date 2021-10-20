import { CustomThemeProps } from 'styled-components';

import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  type PaletteOptions = CustomThemeProps;

  interface Palette extends createPalette.Palette, CustomThemeProps {}
}
