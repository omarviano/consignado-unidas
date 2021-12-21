import React from 'react';
import { DataGridProps } from '@mui/x-data-grid';

export type TableProps = DataGridProps & {
  disableBoxShadow?: boolean;
  noData?: React.JSXElementConstructor<any>;
};
