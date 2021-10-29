import React, { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { ArrowRightAlt } from '@mui/icons-material';

import { ContinueButtonProps } from './props';
import * as Styled from './styles';

const ContinueButton: React.FC<ContinueButtonProps> = ({
  disabled,
  ...rest
}) => {
  const { isValid, isValidating } = useFormikContext();
  const isDisabled = useMemo(
    () => !isValid || disabled || isValidating,
    [disabled, isValid, isValidating],
  );

  return (
    <Styled.ContinueButton {...rest} disabled={isDisabled}>
      {isValidating ? 'Validando dados' : 'Continuar'} <ArrowRightAlt />
    </Styled.ContinueButton>
  );
};

export { ContinueButton };
