import styled from 'styled-components';
import SliderStyles from '@material-ui/core/Slider';
import TypographyStyles from '@material-ui/core/Typography';

export const Container = styled.div`
  margin-top: 102px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 148px;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding-left: 26px;
`;

export const ContentSlider = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 449px;
`;

export const TextContractProposal = styled(TypographyStyles)`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

export const TextValueSlider = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[400]};
  font-size: 30px;
  font-weight: 500;
  margin-top: 25px;
`;

export const Slider = styled(SliderStyles)`
  margin-top: 15px;
`;

export const ContentTextInformation = styled.div`
  max-width: 456px;
`;

export const TextInformation = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[500]};

  strong {
    font-weight: 500;
  }
`;
