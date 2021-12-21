import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

export const Container = styled.div`
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding-left: 26px;

  @media (max-width: 1000px) {
    display: block;
    padding: 14px;
  }

  @media (max-width: 920px) {
    margin-top: 0;
  }
`;

export const ContentSlider = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 449px;

  @media (max-width: 1000px) {
    max-width: 100%;
    text-align: center;

    > span {
      width: 70%;
      max-width: 300px;
      margin: 18px auto 0;
    }
  }
`;

export const TextContractProposal = styled(TypographyStyles)`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[500]};

  @media (max-width: 1000px) {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const TextValueSlider = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 30px;
  font-weight: 500;
  margin-top: 25px;

  @media (max-width: 1000px) {
    font-size: 24px;
    line-height: 28px;
    margin-top: 8px;
  }
`;

export const ContentTextInformation = styled.div`
  max-width: 456px;
  margin: 24px 0 16px;
  list-style: initial;

  @media (max-width: 1000px) {
    display: none;
  }
`;
