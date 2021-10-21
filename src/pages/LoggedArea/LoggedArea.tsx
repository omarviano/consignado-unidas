import { FC, memo } from 'react';
import { RouteAccess } from 'components/RouteAccess';
import ImageInformation from 'assets/icons/information.svg';

import { Button } from 'components/Buttons/Button';
import { useAuth } from 'hooks/auth';
import { Typography } from '@material-ui/core';
import { getToken } from 'hooks/auth/storage';
import { Layout } from 'components/Layout';

import * as Styled from './styles';

const LoggedArea: FC = memo(() => {
  const { signOut } = useAuth();

  const text = 'Este valor se refêre ao valor da parcela disponível para você.';

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout>
        <Styled.Container>
          <Styled.TextUserLogged variant="h2">
            Olá! {getToken()?.user.name}!
          </Styled.TextUserLogged>
          <Styled.TextValueAvailable variant="h2">
            R$ 300,00
          </Styled.TextValueAvailable>
          <Styled.TextInformation variant="h4">
            Margem total liberada exclusivamente para você
            <Styled.Tooltip title={text} placement="right-end">
              <img src={ImageInformation} alt="Imagem" />
            </Styled.Tooltip>
          </Styled.TextInformation>
        </Styled.Container>
      </Layout>
    </RouteAccess>
  );
});

export { LoggedArea };
