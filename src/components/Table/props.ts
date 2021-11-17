import React from 'react';
import { DataGridProps } from '@mui/x-data-grid';

export type TableProps = DataGridProps & {
  noData?: React.JSXElementConstructor<any>;
};
