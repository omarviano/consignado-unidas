import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 36px;
  background: #f9f9f9;
  box-shadow: 0px 4px 20px rgba(46, 43, 80, 0.25);
  border-radius: 8px;
  z-index: 999;

  button {
    width: 203px;
    margin-left: 40px;
    text-transform: none;
  }

  @media (max-width: 768px) {
    height: 108px;
    padding: 24px 16px;
    justify-content: space-between;

    button {
      width: 148px;
      height: 32px;
      margin-left: 10px;
    }
  }

  & + div .grecaptcha-badge {
    bottom: 88px !important;

    @media (max-width: 768px) {
      bottom: 120px !important;
    }
  }
`;

export const Text = styled(TypographyStyles)`
  max-width: 1106px;
  font-size: 18px;
  line-height: 21px;
  color: ${({ theme }) => theme.palette.grey[400]};

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: underline;
    font-weight: bold;
  }

  @media (max-width: 500px) {
    max-width: 180px;
    font-size: 10px;
    line-height: 11.72px;
  }
`;
