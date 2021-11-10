import { Layout } from 'components/Layout';
import { RouteAccess } from 'components/RouteAccess';
import { FC } from 'react';

// import { Container } from './styles';

const FAQ: FC = () => (
  <RouteAccess typesOfAccess="auth">
    <Layout
      containerStyles={{
        maxWidth: '1276px',
        padding: 0,
      }}
    >
      <h1>FAQ</h1>
    </Layout>
  </RouteAccess>
);

export { FAQ };
