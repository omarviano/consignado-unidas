import { FC, memo } from 'react';
import ImageSlider from 'assets/icons/slider.svg';
import { SliderThumb } from '@mui/material';

import { SliderComponentProps } from './props';
import * as Styled from './styles';

const Slider: FC<SliderComponentProps> = memo(props => {
  const { ...rest } = props;

  type SliderComponentProps = React.HTMLAttributes<unknown>;

  function SliderThumbComponent(props: SliderComponentProps) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <Styled.Icon src={ImageSlider} alt="Imagem" />
      </SliderThumb>
    );
  }

  return (
    <Styled.Slider {...rest} components={{ Thumb: SliderThumbComponent }} />
  );
});

export { Slider };
