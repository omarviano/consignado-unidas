import styled from 'styled-components';
import TypographyStyles from '@material-ui/core/Typography';

export const Container = styled.div`
  margin-top: 127px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 148px;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding: 28px 0 36px 120px;
`;

export const TextUserLogged = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[200]};
`;

export const TextValueAvailable = styled(TypographyStyles)`
  margin-top: 8px;
  color: ${({ theme }) => theme.palette.grey[100]};
  font-weight: 400;
`;

export const TextInformation = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[100]};
  font-weight: 400px;
  margin-top: 12px;

  img {
    margin-left: 4px;
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
`;
