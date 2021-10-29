import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { FC } from 'react';

import { CardSimulateLoan } from './components/CardSimulateLoan';

const SimulateLoan: FC = () => (
  <RouteAccess typesOfAccess="auth">
    <Layout
      containerStyles={{
        maxWidth: '1276px',
        padding: '0 24px',
      }}
    >
      <CardSimulateLoan />
    </Layout>
  </RouteAccess>
);

export { SimulateLoan };
