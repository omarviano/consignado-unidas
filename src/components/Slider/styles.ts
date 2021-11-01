import styled from 'styled-components';
import SliderStyles from '@mui/material/Slider';

export const Slider = styled(SliderStyles)`
  margin-top: 30px;
  color: ${({ theme }) => theme.palette.primary.main};

  .MuiSlider-thumb {
    height: 34px;
    width: 34px;
    background-color: ${({ theme }) => theme.palette.primary.contrastText};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .MuiSlider-rail {
    color: ${({ theme }) => theme.palette.grey[50]};
  }
`;

export const Icon = styled.img`
  margin-top: 8px;
`;
