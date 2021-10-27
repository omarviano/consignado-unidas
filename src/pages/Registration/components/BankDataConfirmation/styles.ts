import styled from 'styled-components';
import { Box, IconButton } from '@material-ui/core';

export const BankDetailsConfirmationContainer = styled.div`
  max-width: 450px;
  margin: auto;
`;

export const Hello = styled.div`
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #646464;
`;

export const Email = styled.div`
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[100]};
`;

export const BankDetailsConfirmationTitle = styled.div`
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #646464;
  margin: 32px 0;
  max-width: 450px;
`;

export const BankDetailsConfirmationText = styled.div`
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[100]};
  max-width: 450px;
`;

export const IAgreeTermsContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 350px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[100]};
  margin-top: 32px;
`;

export const TermsText = styled.div``;

export const TermsLink = styled.button`
  border: 0;
  background: none;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: underline;
`;

export const IAgreeTermsContainerButtons = styled.div`
  display: flex;
  margin: 32px 0;

  button {
    max-width: 188px;
  }

  button + button {
    margin-left: 40px;
  }
`;

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 685px;
  background: #fff;
  padding: 64px 24px;
  text-align: center;

  .warning-icon {
    color: ${({ theme }) => theme.palette.warning.main};
  }

  .button-modal-validation {
    max-width: 300px;
    margin: 24px auto 0;
  }
`;

export const ModalText = styled.p`
  font-size: 18px;
  line-height: 34px;
  max-width: 447px;
  margin: 32px auto 0;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;
