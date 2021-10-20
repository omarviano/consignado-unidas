import styled from 'styled-components';

export const BankDetailsConfirmationContainer = styled.div``;

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
  color: #848484;
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
  color: #848484;
  max-width: 450px;
`;

export const IAgreeTermsContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 350px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.2px;
  color: #848484;
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

  button + button {
    margin-left: 40px;
  }
`;
