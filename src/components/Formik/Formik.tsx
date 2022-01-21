/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useRef, useEffect } from 'react';

import {
  Formik as FormikBaseProps,
  Form as FormBaseProps,
  FormikProps,
  FormikConfig,
} from 'formik';

export function Formik<Values>(props: FormikConfig<Values>) {
  const { children, ...rest } = props;

  const formRef = useRef<FormikProps<Values> | null>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.validateForm();
    }
  }, []);

  return (
    <FormikBaseProps innerRef={formRef} {...rest}>
      <FormBaseProps data-testid="form">{children}</FormBaseProps>
    </FormikBaseProps>
  );
}
