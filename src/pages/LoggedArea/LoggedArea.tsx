import { FC, memo } from 'react';
import { RouteAccess } from 'components/RouteAccess';

import { Button } from 'components/Buttons/Button';
import { useAuth } from 'hooks/auth';
import { Typography } from '@material-ui/core';
import { getToken } from 'hooks/auth/storage';
import { Layout } from 'components/Layout';

const LoggedArea: FC = memo(() => {
  const { signOut } = useAuth();

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout>
        <Typography variant="h6" color="primary">
          Voce está logado: {getToken()?.user.name}
        </Typography>

        <Button
          style={{
            width: '100px',
          }}
          variant="contained"
          color="primary"
          onClick={signOut}
        >
          Sair
        </Button>
      </Layout>
    </RouteAccess>
  );
});

export { LoggedArea };
