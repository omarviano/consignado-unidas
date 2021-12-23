import styled, { css } from 'styled-components';
import { IconButton } from '@mui/material';
import TypographyStyles from '@mui/material/Typography';
import {
  Timeline as TimelineStyles,
  TimelineDot as TimelineDotStyles,
  TimelineConnector as TimelineConnectorStyles,
  TimelineSeparator as TimelineSeparatorStyles,
  TimelineItem as TimelineItemStyles,
  TimelineContent as TimelineContentStyles,
} from '@mui/lab';

interface ContentProps {
  setHeight: number;
}

interface TimelineDotProps {
  colorBackGround: 'red' | 'green' | 'yellow' | 'blue';
}

export const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  overflow: hidden;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  margin-bottom: 7px;
  border-radius: 4px;
`;

export const DropDown = styled.div`
  background-color: lightblue;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -40;
  margin: 16px;
`;

export const StepByStepText = styled(TypographyStyles)`
  font-size: 16px;
  line-height: 19px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.grey[100]};
  letter-spacing: 0.2px;
`;

export const StepText = styled(StepByStepText)`
  margin-top: 11px;
  color: ${({ theme }) => theme.palette.grey[200]};

  display: flex;
  align-items: center;

  svg {
    margin-left: 8px;
  }
`;

export const Content = styled.div<ContentProps>`
  width: 100%;
  height: 0;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &.show {
    height: ${({ setHeight }) => setHeight}px;
  }
`;

export const Timeline = styled(TimelineStyles)`
  max-width: 100px;

  .MuiTimelineDot-root {
    margin: 0;
  }

  .MuiTimelineContent-root {
    padding: 0 19px;
  }
`;

export const TimelineDot = styled(TimelineDotStyles)<TimelineDotProps>`
  padding: 0;
  box-shadow: none;

  ${({ colorBackGround }) =>
    colorBackGround === 'blue' &&
    css`
      background-color: #0b9bd0;
    `}

  ${({ colorBackGround }) =>
    colorBackGround === 'yellow' &&
    css`
      background-color: #febc59;
    `}

  ${({ colorBackGround }) =>
    colorBackGround === 'green' &&
    css`
      background-color: #08803a;
    `}

    ${({ colorBackGround }) =>
    colorBackGround === 'red' &&
    css`
      background-color: #d81616;
    `}
`;

export const TimelineConnector = styled(TimelineConnectorStyles)`
  background-color: #0b9bd0;
`;

export const TimelineSeparator = styled(TimelineSeparatorStyles)`
  margin-left: -6px;
  height: 100px;
`;

export const TimelineItem = styled(TimelineItemStyles)``;

export const TimelineContent = styled(TimelineContentStyles)``;

export const IconContainer = styled(IconButton)`
  width: 100%;
  color: ${({ theme }) => theme.palette.grey[100]};
  display: flex;
  justify-content: center;
`;
