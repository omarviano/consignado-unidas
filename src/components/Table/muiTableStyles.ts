import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: () => ({
    border: 'none',

    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#4A5970',
      color: '#FFFF',
      border: 'none',
      fontSize: 16,
      boxShadow: '0px 4px 6px rgba(46, 43, 80, 0.25)',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'normal',
    },
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
      textAlign: 'center',
      fontSize: 18,
      color: '#848484',
    },
    '& .MuiDataGrid-columnHeaderCheckbox': {
      visibility: 'hidden',
    },
    '& .Mui-selected': {
      backgroundColor: 'rgba(0,91,158,.1) !important',
      fontWeight: 'bold',
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-cellCheckbox, & .MuiDataGrid-columnHeaderCheckbox': {
      width: '88px !important',
      minWidth: '88px !important',
      maxWidth: '88px !important',
    },
  }),
}));
