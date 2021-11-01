import React, { memo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useStyles } from './muiTableStyles';
import * as Styled from './style';
import { TableProps } from './props';

const Table: React.FC<TableProps> = memo(
  ({
    columns,
    rows,
    hideFooterPagination = true,
    hideFooter = true,
    headerHeight = 40,
    rowHeight = 49,
    autoHeight = true,
    disableSelectionOnClick = true,
    ...rest
  }) => {
    const classes = useStyles();

    return (
      <Styled.Container>
        <DataGrid
          className={classes.root}
          columns={columns}
          rows={rows}
          hideFooterPagination={hideFooterPagination}
          hideFooter={hideFooter}
          headerHeight={headerHeight}
          rowHeight={rowHeight}
          autoHeight={autoHeight}
          disableSelectionOnClick={disableSelectionOnClick}
          {...rest}
        />
      </Styled.Container>
    );
  },
);

export { Table };
