import React from 'react';

import * as Styled from './styles';

const NoDataTable: React.FC = ({ children }) => (
  <Styled.NoData>{children || 'Nenhum dado disponível'}</Styled.NoData>
);

export { NoDataTable };
