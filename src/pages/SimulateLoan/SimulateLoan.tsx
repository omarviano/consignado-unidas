import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { FC } from 'react';

import { CardSimulateLoan } from './components/CardSimulateLoan';
import { Table } from './components/Table';

const SimulateLoan: FC = () => (
  <RouteAccess typesOfAccess="auth">
    <Layout
      containerStyles={{
        maxWidth: '1276px',
        padding: '0 24px',
      }}
    >
      <CardSimulateLoan />
      <Table />
    </Layout>
  </RouteAccess>
);

export { SimulateLoan };
