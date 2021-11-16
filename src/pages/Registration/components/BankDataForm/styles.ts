import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';
import styled from 'styled-components';

export const BankDataContainer = styled.div`
  margin: 0 auto 32px;
  max-width: 450px;

  .MuiFormControl-root + .MuiFormControl-root,
  div + .MuiFormControl-root {
    margin-top: 15px;
  }
`;

export const BankDataInputs = styled.div`
  margin-top: 32px;

  .MuiGrid-container {
    margin-top: 8px;
  }
`;

export const Div = styled.div`
  margin-top: 15px;

  & + .MuiFormControl-root {
    margin-top: 15px;
  }

  label {
    display: inline-flex;
    margin-bottom: 4px;
  }
`;

export const DataContainer = styled.div``;

export const Hello = styled.div`
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const Email = styled.div`
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[100]};
`;

export const Title = styled.div`
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[400]};
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

export const AgencyInput = styled(Input)`
  max-width: 166px;
`;

export const AccountInput = styled(Input)`
  display: inline-flex;
  width: 212px;
`;

export const DigitInput = styled(Input)`
  display: inline-flex;
  width: 80px;
  margin: 0;
`;

export const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  margin: 32px auto 32px 0;
  max-width: 290px;

  svg {
    margin-left: 16px;
  }
`;
