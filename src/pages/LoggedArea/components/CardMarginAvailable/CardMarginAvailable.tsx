/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, Fragment, memo } from 'react';
import ImageInformation from 'assets/icons/information.svg';
import ReactTooltip from 'react-tooltip';
import { getToken } from 'hooks/auth/storage';
import { formatValue } from 'utils/formatValue';
import ImageAlertYellow from 'assets/icons/alert-yellow.svg';

import { useSimulateLoanRealTime } from 'hooks/simulateRealtime';
import * as Styled from './styles';

const CardMarginAvailable: FC = memo(() => {
  const { dataMargin } = useSimulateLoanRealTime();

  return (
    <Styled.Container>
      <Styled.TextUserLogged variant="h2">
        Olá! {getToken()?.user.name}!
      </Styled.TextUserLogged>
      {dataMargin[0]?.availableValue <= 0 ? (
        <Styled.TextMarginNotAvailable variant="h4">
          <img src={ImageAlertYellow} alt="Alert" />
          Infelizmente você não tem margem disponível para solicitação de
          empréstimo :(. Entre em contato com RH da empresa.
        </Styled.TextMarginNotAvailable>
      ) : (
        <Fragment>
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
              backgroundColor="transparent"
              id="text-tooltip"
              place="right"
              type="dark"
              effect="solid"
            >
              <Styled.TextInformationTooltip>
                Este valor se refere ao valor da parcela disponível para você.
              </Styled.TextInformationTooltip>
            </ReactTooltip>
          </Styled.TextInformation>
        </Fragment>
      )}
    </Styled.Container>
  );
});

export { CardMarginAvailable };
