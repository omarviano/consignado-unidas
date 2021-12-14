import { FC, useEffect } from 'react';
import { RouteAccess } from 'components/RouteAccess';
import { Layout } from 'components/Layout';
import { withContext } from 'utils/withContext';
import { SimulateLoanProvider, useSimulateLoan } from 'hooks/simulate';
import { useSimulateLoanRealTime } from 'hooks/simulateRealtime';
import { CardMarginAvailable } from './components/CardMarginAvailable';
import { CardSimulateLoan } from './components/CardSimulateLoan';
import { CreditUnderAnalysis } from './components/CreditUnderAnalysis';
import { ModalSimulateLoan } from './components/ModalSimulateLoan';

import * as Styled from './styles';
import {
  ModalSimulateLoanProvider,
  useModalSimulateLoan,
} from './components/ModalSimulateLoan/context';

const LoggedArea: FC = withContext(
  () => {
    const { modalActive, statusCode } = useSimulateLoan();
    const { getMargin } = useSimulateLoanRealTime();
    const { toggleModal } = useModalSimulateLoan();

    useEffect(() => {
      getMargin();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (modalActive && statusCode !== 500) return toggleModal();
      return () => {
        <> </>;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalActive]);

    return (
      <RouteAccess typesOfAccess="auth">
        <Layout containerStyles={{ maxWidth: 958 }}>
          <Styled.CardsContainer>
            <CardMarginAvailable />
            <CreditUnderAnalysis />
          </Styled.CardsContainer>

          <CardSimulateLoan />
          <ModalSimulateLoan />
        </Layout>
      </RouteAccess>
    );
  },
  SimulateLoanProvider,
  ModalSimulateLoanProvider,
);

export { LoggedArea };
