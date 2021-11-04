import { useFormikContext } from 'formik';
import { forwardRef, memo, useMemo } from 'react';

import { Button } from '../Button';
import { SubmitButtonProps } from './props';

const SubmitButton = memo(
  forwardRef<HTMLButtonElement, SubmitButtonProps>(
    ({ children, disabled, ...rest }, ref) => {
      const { isValid } = useFormikContext();
      const isDisabled = useMemo(
        () => !isValid || disabled,
        [disabled, isValid],
      );

      return (
        <Button
          fullWidth
          ref={ref}
          type="submit"
          {...rest}
          disableElevation
          disabled={isDisabled}
        >
          {children}
        </Button>
      );
    },
  ),
);

export { SubmitButton };
