import { FC, useEffect } from 'react';
import { RouteAccess } from 'components/RouteAccess';
import { Layout } from 'components/Layout';
import { withContext } from 'utils/withContext';
import { MarginUserProvider, useMarginUser } from './context';
import { CardMarginAvailable } from './components/CardMarginAvailable';
import { CardSimulateLoan } from './components/CardSimulateLoan';
import { ModalSimulateLoan } from './components/ModalSimulateLoan';
import {
  ModalSimulateLoanProvider,
  useModalSimulateLoan,
} from './components/ModalSimulateLoan/context';

const LoggedArea: FC = withContext(
  () => {
    const { getMargin, modalActive, statusCode } = useMarginUser();
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
        <Layout>
          <CardMarginAvailable />
          <CardSimulateLoan />
          <ModalSimulateLoan />
        </Layout>
      </RouteAccess>
    );
  },
  MarginUserProvider,
  ModalSimulateLoanProvider,
);

export { LoggedArea };
