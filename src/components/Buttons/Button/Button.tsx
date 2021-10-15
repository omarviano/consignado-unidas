import { useFormikContext } from 'formik';
import { forwardRef, memo, useMemo } from 'react';

import { ButtonProps } from './props';
import * as Styled from './styles';

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { children, disabled, ...rest } = props;
    const { isValid } = useFormikContext();

    const isDisabled = useMemo(() => !isValid || disabled, [disabled, isValid]);

    return (
      <Styled.Button
        fullWidth
        ref={ref}
        type="button"
        {...rest}
        disabled={isDisabled}
        disableElevation
      >
        {children}
      </Styled.Button>
    );
  }),
);

Button.displayName = 'Button';

export { Button };
