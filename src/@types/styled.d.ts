import 'styled-components';

import { Theme } from '@mui/material';
import { Palette } from '@mui/material/styles/createPalette';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomThemeProps {}

  export interface DefaultTheme extends Theme {
    palette: Palette;
  }
}
