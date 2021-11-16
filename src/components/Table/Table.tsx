import React, { memo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { NoDataTable } from 'components/NoDataTable';

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
    disableBoxShadow,
    ...rest
  }) => {
    const classes = useStyles();

    return (
      <Styled.Container disableBoxShadow={disableBoxShadow}>
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
          components={{
            NoRowsOverlay: NoDataTable,
          }}
          {...rest}
        />
      </Styled.Container>
    );
  },
);

export { Table };
