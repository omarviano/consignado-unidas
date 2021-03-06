import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  margin: 107px 16px 0 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 148px;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding: 28px 0 36px 120px;

  @media (max-width: 768px) {
    padding: 16px 0 16px 16px;
    margin-top: 0;
  }
`;

export const TextUserLogged = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[200]};

  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.grey[500]};
  }
`;

export const TextValueAvailable = styled(TypographyStyles)`
  margin-top: 8px;
  color: ${({ theme }) => theme.palette.grey[100]};
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.grey[400]};
  }
`;

export const TextInformation = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[100]};
  font-weight: 400px;
  margin-top: 12px;

  img {
    margin-left: 4px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    color: ${({ theme }) => theme.palette.grey[500]};
    font-weight: 700;
  }
`;

export const TextInformationTooltip = styled.p`
  padding: 18px 20px 14px 13px;
  width: 241px;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  font-size: 14px;
  font-weight: 400;
  color: #848484;
  border-radius: 6px;
  background-color: #fff;
`;

export const TextMarginNotAvailable = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[100]};
  font-weight: 500;
  line-height: 25.5px;
  letter-spacing: 0.2px;
  margin-top: 6px;

  img {
    margin: 0 10px 0 -30px;
  }

  @media (max-width: 768px) {
    font-size: 12px;

    img {
      margin-left: 0;
    }
  }
`;
