/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react';
import { RouteAccess } from 'components/RouteAccess';
import ImageInformation from 'assets/icons/information.svg';
import ReactTooltip from 'react-tooltip';

import { getToken } from 'hooks/auth/storage';
import { Layout } from 'components/Layout';
import { withContext } from 'utils/withContext';
import { formatValue } from 'utils/formatValue';
import { MarginUserProvider, useMarginUser } from './context';

import * as Styled from './styles';

const LoggedArea: FC = withContext(() => {
  const { dataMargin, getMargin } = useMarginUser();

  useEffect(() => {
    getMargin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout>
        <Styled.Container>
          <Styled.TextUserLogged variant="h2">
            Olá! {getToken()?.user.name}!
          </Styled.TextUserLogged>
          <Styled.TextValueAvailable variant="h2">
            {dataMargin[0]?.availableValue
              ? formatValue(dataMargin[0]?.availableValue)
              : 'R$ -'}
          </Styled.TextValueAvailable>
          <Styled.TextInformation variant="h4">
            Margem total liberada exclusivamente para você
            <a data-tip data-for="text-tooltip">
              <img src={ImageInformation} alt="Imagem" />
            </a>
            <ReactTooltip
              backgroundColor="#FFFF"
              id="text-tooltip"
              place="right"
              type="dark"
              effect="solid"
            >
              <Styled.TextInformationTooltip>
                Este valor se refêre ao valor da parcela disponível para você.
              </Styled.TextInformationTooltip>
            </ReactTooltip>
          </Styled.TextInformation>
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
}, MarginUserProvider);

export { LoggedArea };
