import styled from 'styled-components';
import { Card as MUICard } from '@mui/material';
import TypographyStyles from '@mui/material/Typography';
import { Button } from 'components/Buttons/Button';
import BoxStyles from '@mui/material/Box';
import GridStyles from '@mui/material/Grid';
import { SubmitButton } from 'components/Buttons/SubmitButton';

export const Card = styled(MUICard)`
  padding: 36px 25px 0 33px;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  margin-bottom: 32px;
`;

export const LoanInformation = styled(TypographyStyles)`
  line-height: 34px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
`;

export const TotalAmountOfLoanRequested = styled(TypographyStyles)`
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const Approved = styled.strong`
  text-transform: uppercase;
  font-size: 18px;
  color: #27ae60;
`;

export const InstallmentDueDate = styled(TypographyStyles)`
  line-height: 34px;
  letter-spacing: 0.2px;
  margin-top: 78px;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const ProposalInformation = styled(TypographyStyles)`
  line-height: 11px;
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-bottom: 44px;
`;

export const TextBlack = styled.span`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-weight: 500;
`;

export const DivButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

export const ButtonAcceptProposal = styled(Button)`
  text-transform: capitalize;
  width: 186px;
  background-color: #005b9e;
`;

export const ButtonGoLoggedArea = styled(Button)`
  text-transform: none;
  width: 285px;
  background-color: #005b9e;
  margin-top: 24px;
`;

export const AdditionalData = styled(TypographyStyles)`
  color: #969696;
  font-weight: 500;
  margin-bottom: 30px;
`;

export const ContainerModal = styled(BoxStyles)`
  max-width: 969px;
  padding: 30px 52px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 1000px) {
    max-height: 100vh;
  }
`;

export const GridContainer = styled(GridStyles)`
  margin-bottom: 22px;
`;

export const BankData = styled(AdditionalData)``;

export const DivSelect = styled.div`
  margin-top: 4px;
`;

export const ButtonToSend = styled(SubmitButton)`
  text-transform: capitalize;
  width: 205px;
  background-color: #005b9e;
`;

export const ButtonRefuseProposal = styled(Button)`
  text-transform: capitalize;
  width: 186px;
  margin-left: 60px;
`;

export const ContainerModalRefuseProposal = styled(BoxStyles)`
  max-width: 685px;
  padding: 155px 125px;
`;

export const RefuseProposal = styled(TypographyStyles)`
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[200]};
`;

export const DivButtonsYesOrNo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

export const ButtonYes = styled(Button)`
  text-transform: capitalize;
  width: 188px;
  background-color: #005b9e;
`;

export const ButtonNo = styled(Button)`
  text-transform: capitalize;
  width: 188px;
  margin-left: 30px;
`;

export const ContainerModalRefuseProposalAccept = styled(BoxStyles)`
  max-width: 405px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px;
`;

export const RefuseProposalAccept = styled(RefuseProposal)`
  margin-top: 12px;
`;

export const ButtonGoToHomeScreen = styled(Button)`
  text-transform: none;
  width: 285px;
  background-color: #005b9e;
  margin-top: 24px;
`;

export const CheckCircle = styled(CheckCircleStyles)`
  width: 48px;
  height: 48px;
`;
