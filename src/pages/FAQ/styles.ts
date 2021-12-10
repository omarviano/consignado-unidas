import styled, { css } from 'styled-components';
import { Card as MUICard } from '@mui/material';
import TypographyStyles from '@mui/material/Typography';
import AccordionStyles from '@mui/material/Accordion';
import MUIAccordionSummary from '@mui/material/AccordionSummary';

interface TitleQuestionProps {
  changeColor: boolean;
}

export const Container = styled(MUICard)`
  margin: 22px 40px 16px;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);

  @media (max-width: 768px) {
    box-shadow: none;
    margin: 0 16px;
    background: none;
  }
`;

export const Header = styled(TypographyStyles)`
  display: flex;
  justify-content: flex-start;
  padding: 20px 0 0 53px;
`;

export const Content = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 118px 0 118px;

  @media (max-width: 900px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const FAQ = styled(TypographyStyles)`
  font-size: 18px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.grey[500]};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const CommonQuestions = styled(TypographyStyles)`
  margin: 70px 0 80px 0;
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[400]};
  text-align: center;

  @media (max-width: 768px) {
    margin: 16px 0 73px;
  }
`;

export const HaveQuestions = styled(TypographyStyles)`
  margin: 70px 0 100px 0;
  text-align: center;
  font-size: 21px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[500]};
  line-height: 32.69px;

  @media (max-width: 768px) {
    margin: 36px 0;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const Email = styled.strong`
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const Accordion = styled(AccordionStyles)`
  margin-bottom: 10px;
  border: 1px solid #c4c4c4;
  background: transparent;
  box-shadow: none;
  border-radius: 4px;
`;

export const AccordionSummary = styled(MUIAccordionSummary)`
  .MuiAccordionSummary-content {
    max-width: 90%;
  }

  .MuiAccordionSummary-content p {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TitleQuestion = styled(TypographyStyles)<TitleQuestionProps>`
  font-weight: 500;
  flex-shrink: 0;
  font-size: 21px;
  line-height: 24.61px;

  ${({ changeColor }) =>
    changeColor
      ? css`
          color: #005b9e;
        `
      : css`
          color: ${({ theme }) => theme.palette.grey[400]};
        `}
`;

export const QuestionAnswered = styled(TypographyStyles)`
  font-weight: 400;
  font-size: 21px;
  font-size: 21px;
  line-height: 33px;
  color: ${({ theme }) => theme.palette.grey[400]};
`;
