import { FC } from 'react';
import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';

import { SimulateLoanProvider } from 'hooks/simulate';
import { withContext } from 'utils/withContext';
import { CardSimulateLoan } from './components/CardSimulateLoan';
import { Table } from './components/Table';

const SimulateLoan: FC = withContext(
  () => (
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
  ),
  SimulateLoanProvider,
);

export { SimulateLoan };
