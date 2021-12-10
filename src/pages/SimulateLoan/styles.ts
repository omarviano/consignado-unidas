import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Box } from '@mui/material';

import { Button } from 'components/Buttons/Button';

export const Container = styled.div`
  padding: 0 24px;

  @media (max-width: 1000px) {
    padding: 0 16px;
  }
`;

export const SelectMostSuitableOption = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[500]};
  margin: 15px 0 12px;
`;

export const ContainerButton = styled.div`
  display: flex;
  margin: 8px 0 35px;
`;

export const RequestButton = styled(Button)`
  margin-left: auto;
  max-width: 215px;
  font-size: 16px;
  text-transform: capitalize;
`;

export const ModalSuccessContent = styled(Box)`
  width: 546px;
  text-align: center;
  padding: 48px;

  .success-icon {
    color: ${({ theme }) => theme.palette.success.main};
    width: 48px;
    height: 48px;
  }

  .redirect-button {
    margin-top: 14px;
    max-width: 156px;
    text-transform: capitalize;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 24px;
  }
`;

export const ModalErrorContent = styled(Box)`
  width: 530px;
  text-align: center;
  padding: 40px;

  .cancel-icon {
    color: #ffdd00;
    width: 48px;
    height: 48px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 36px 29px;
  }
`;

export const ModalText = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-bottom: 26px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const ModalConfirmContent = styled(Box)`
  width: 464px;
  text-align: center;
  padding: 40px;

  .confirm-button {
    max-width: 137px;
    margin-top: 40px;
    text-transform: capitalize;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 48px 29px;
    text-align: left;
  }
`;

export const ModalConfirmHello = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-bottom: 40px;

  b {
    display: block;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const ModalConfirmData = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[400]};
  text-align: left;
  margin-left: 36px;

  @media (max-width: 768px) {
    margin-left: 0;

    span {
      font-weight: bold;
    }
  }
`;

export const ResponsiveContainer = styled.div`
  margin: 8px 0 4px;
  padding: 8px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;

  ul {
    padding-left: 16px;
  }

  > div {
    margin-top: 8px;
  }

  .loading {
    display: block;
    margin: auto;
  }
`;

export const NoData = styled(TypographyStyles)`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[200]};
  padding: 32px;
  text-align: center;
`;
