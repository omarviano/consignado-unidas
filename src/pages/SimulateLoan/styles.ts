import styled, { css } from 'styled-components';
import TypographyStyles from '@mui/material/Typography';
import { Box } from '@mui/material';

import { Button } from 'components/Buttons/Button';

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

export const CloseModalButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 0;
  border: 0;
  background: none;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const cssModal = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

export const ModalSuccessContent = styled(Box)`
  ${cssModal}
  max-width: 546px;
  background: #fff;
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
`;

export const ModalErrorContent = styled(Box)`
  ${cssModal}
  max-width: 530px;
  background: #fff;
  text-align: center;
  padding: 40px;

  .cancel-icon {
    color: #ffdd00;
    width: 48px;
    height: 48px;
  }
`;

export const ModalText = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[200]};
  margin-bottom: 26px;
`;

export const ModalConfirmContent = styled(Box)`
  ${cssModal}
  max-width: 464px;
  background: #fff;
  text-align: center;
  padding: 40px;

  .confirm-button {
    max-width: 137px;
    margin-top: 40px;
    text-transform: capitalize;
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
`;

export const ModalConfirmData = styled(TypographyStyles)`
  font-size: 18px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.palette.grey[400]};
  text-align: left;
  margin-left: 36px;
`;
