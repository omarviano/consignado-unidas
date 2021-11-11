import styled, { css } from 'styled-components';
import { Card as MUICard } from '@mui/material';
import TypographyStyles from '@mui/material/Typography';
import AccordionStyles from '@mui/material/Accordion';

interface TitleQuestionProps {
  changeColor: boolean;
}

export const Container = styled(MUICard)`
  margin-top: 76px;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
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
`;

export const FAQ = styled(TypographyStyles)`
  font-size: 18px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const CommonQuestions = styled(TypographyStyles)`
  margin: 70px 0 80px 0;
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[400]};
  text-align: center;
`;

export const HaveQuestions = styled(TypographyStyles)`
  margin: 70px 0 100px 0;
  text-align: center;
  font-size: 21px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[500]};
  line-height: 32.69px;
`;

export const Email = styled.strong`
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const Accordion = styled(AccordionStyles)`
  margin-bottom: 10px;
  border: 1px solid #c4c4c4;
  background: transparent;
  filter: drop-shadow(0px 2px 6px rgba(46, 43, 80, 0.25));
  box-shadow: none;
  border-radius: 4px;
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
