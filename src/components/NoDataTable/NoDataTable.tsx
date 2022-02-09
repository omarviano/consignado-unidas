import React from 'react';

import * as Styled from './styles';

const NoDataTable: React.FC = ({ children }) => (
  <Styled.NoData data-testid="no-table-data">
    {children || 'Nenhum dado disponível'}
  </Styled.NoData>
);

export { NoDataTable };
