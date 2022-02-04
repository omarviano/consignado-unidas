import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import { Warning } from '@mui/icons-material';

import { RoutingPath } from 'utils/routing';
import useModal from 'hooks/useModal';

import { ModalMessage } from 'components/ModalMessage';
import { Formik } from 'components/Formik';
import { Button } from 'components/Buttons/Button';

import { Link } from 'react-router-dom';
import * as Styled from './styles';

import { BankDataConfirmationProps } from './props';

const BankDataConfirmation: React.FC<BankDataConfirmationProps> = ({
  submitting,
  onSubmit,
  onClickNoButton,
  username,
  email,
}) => {
  const [agree, setAgree] = useState(false);
  const { open: modalMessage, toggle: toggleModalMessage } = useModal();

  const handleSubmit = data => {
    if (!agree) {
      toggleModalMessage();
      return;
    }

    onSubmit(data);
  };

  const handleClickNoButton = () => {
    if (!agree) {
      toggleModalMessage();
      return;
    }

    onClickNoButton();
  };

  return (
    <Styled.BankDetailsConfirmationContainer>
      <Formik initialValues={{}} onSubmit={handleSubmit} name="form-terms">
        <Styled.Hello id="username">Olá {username}!</Styled.Hello>
        <Styled.Email id="email">{email}</Styled.Email>

        <Styled.BankDetailsConfirmationTitle>
          Você deseja informar os dados complementares e os dados bancários para
          futuros empréstimos?
        </Styled.BankDetailsConfirmationTitle>
        <Styled.BankDetailsConfirmationText>
          Caso você não queira preeencher os dados, não se preocupe, poderá
          cadastrar em um outro momento ok? Lembrando que para esta operação, só
          é possível utilizar conta corrente.
        </Styled.BankDetailsConfirmationText>

        <Styled.IAgreeTermsContainer>
          <Checkbox
            onChange={e => setAgree(e.target.checked)}
            style={{ marginLeft: -8 }}
            data-testid="check"
          />

          <Styled.TermsText>
            Estou de acordo com os{' '}
            <Link to={RoutingPath.PRIVACY}>termos e condições</Link> da{' '}
            <Link to={RoutingPath.PRIVACY}>política de privacidade</Link>.
          </Styled.TermsText>
        </Styled.IAgreeTermsContainer>

        <Styled.IAgreeTermsContainerButtons>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            data-testid="yesButton"
          >
            Sim
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleClickNoButton}
            disabled={submitting}
            data-testid="noButton"
          >
            {submitting ? 'Cadastrando...' : 'Agora não'}
          </Button>
        </Styled.IAgreeTermsContainerButtons>
      </Formik>

      <ModalMessage
        open={modalMessage}
        onClose={toggleModalMessage}
        icon={<Warning color="warning" />}
        text="Para prosseguir, você precisa estar de acordo com os termos e condições da política de privacidade."
        width="600px"
      />
    </Styled.BankDetailsConfirmationContainer>
  );
};

export { BankDataConfirmation };
