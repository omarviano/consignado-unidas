import React from 'react';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';

import { RouteAccess } from 'components/RouteAccess';
import { Layout } from 'components/Layout';

const ContractInstallments = () => (
  <RouteAccess typesOfAccess="auth">
    <Layout
      containerStyles={{
        maxWidth: '1320px',
      }}
    >
      {' '}
      <div>ContractInstallments</div>{' '}
    </Layout>
  </RouteAccess>
);

export default withAITracking(
  reactPlugin,
  ContractInstallments,
  'ContractInstallments',
);
