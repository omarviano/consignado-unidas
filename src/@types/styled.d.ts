import 'styled-components';

import { Theme } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomThemeProps {}

  export interface DefaultTheme extends Theme {
    palette: Palette;
  }
}
