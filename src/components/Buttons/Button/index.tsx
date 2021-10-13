import { forwardRef } from 'react';

import { ButtonProps } from './props';
import * as Styled from './styles';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <Styled.Button fullWidth ref={ref} type="button" {...rest} disableElevation>
      {children}
    </Styled.Button>
  );
});

Button.displayName = 'Button';

export { Button };
