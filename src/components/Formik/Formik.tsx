/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/require-default-props */
import { useRef, useEffect } from 'react';

import {
  Formik as FormikBaseProps,
  Form as FormBaseProps,
  FormikProps,
  FormikConfig,
} from 'formik';

type Point<Values> = FormikConfig<Values> & {
  name?: string;
};

export function Formik<Values>(props: Point<Values>) {
  const { name = 'form', children, ...rest } = props;

  const formRef = useRef<FormikProps<Values> | null>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.validateForm();
    }
  }, []);

  return (
    <FormikBaseProps innerRef={formRef} {...rest}>
      <FormBaseProps name={name} data-testid={name}>
        {children}
      </FormBaseProps>
    </FormikBaseProps>
  );
}
