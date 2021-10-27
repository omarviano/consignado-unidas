import { FC, useEffect } from 'react';
import { RouteAccess } from 'components/RouteAccess';
import { Layout } from 'components/Layout';
import { withContext } from 'utils/withContext';
import { MarginUserProvider, useMarginUser } from './context';
import { CardMarginAvailable } from './components/CardMarginAvailable';
import { CardSimulateLoan } from './components/CardSimulateLoan';
import { CreditUnderAnalysis } from './components/CreditUnderAnalysis';

import * as Styled from './styles';

const LoggedArea: FC = withContext(() => {
  const { getMargin } = useMarginUser();

  useEffect(() => {
    getMargin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout>
        <Styled.CardsContainer>
          <CardMarginAvailable />
          <CreditUnderAnalysis />
        </Styled.CardsContainer>
        <CardSimulateLoan />
      </Layout>
    </RouteAccess>
  );
}, MarginUserProvider);

export { LoggedArea };
