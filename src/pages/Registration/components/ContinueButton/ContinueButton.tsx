import React, { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { ArrowRightAlt } from '@mui/icons-material';

import { ContinueButtonProps } from './props';
import * as Styled from './styles';

const ContinueButton: React.FC<ContinueButtonProps> = ({
  disabled,
  ...rest
}) => {
  const { isValid } = useFormikContext();
  const isDisabled = useMemo(() => !isValid || disabled, [disabled, isValid]);

  return (
    <Styled.ContinueButton {...rest} disabled={isDisabled}>
      Continuar <ArrowRightAlt />
    </Styled.ContinueButton>
  );
};

export { ContinueButton };
