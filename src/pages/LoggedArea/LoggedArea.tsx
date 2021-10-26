import { FC, useEffect } from 'react';
import { RouteAccess } from 'components/RouteAccess';
import { Layout } from 'components/Layout';
import { withContext } from 'utils/withContext';
import { MarginUserProvider, useMarginUser } from './context';
import { CardMarginAvailable } from './components/CardMarginAvailable';
import { CardSimulateLoan } from './components/CardSimulateLoan';

const LoggedArea: FC = withContext(() => {
  const { getMargin } = useMarginUser();

  useEffect(() => {
    getMargin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout>
        <CardMarginAvailable />
        <CardSimulateLoan />
      </Layout>
    </RouteAccess>
  );
}, MarginUserProvider);

export { LoggedArea };
