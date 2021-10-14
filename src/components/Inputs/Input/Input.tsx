/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, useCallback, useMemo, memo } from 'react';
import InputMask from 'react-input-mask';

import { useField } from 'formik';

import { InputProps } from './props';
import * as Styled from './styles';

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
      name,
      label,
      value,
      type,
      defaultValue,
      mask = '',
      id,
      onBlur,
      onFocus,
      onChange,
      icon: Icon,
      disabled,
      ...rest
    } = props;

    const [field, meta, helpers] = useField<string>({
      name,
      type,
      defaultValue,
      id,
      value,
    });

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        field.onBlur(event);
        if (onBlur) {
          onBlur(event);
        }

        if (mask) {
          helpers.setValue(event.target.value, true);
        }
      },
      [field, helpers, mask, onBlur],
    );

    const errors = useMemo(() => {
      if (meta.initialError) {
        return {
          error: true,
          helperText: meta.initialError,
        };
      }

      if (meta.error && meta.touched) {
        return {
          error: true,
          helperText: meta.error,
        };
      }

      return {};
    }, [meta.error, meta.initialError, meta.touched]);

    return (
      <Styled.FormControl fullWidth>
        <InputMask
          mask={mask}
          maskChar={null}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={handleBlur}
          onFocus={onFocus}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          {() => (
            <Styled.Input
              ref={ref}
              defaultValue={defaultValue}
              id={name}
              inputRef={ref}
              label={label}
              type={type}
              onFocus={onFocus}
              disabled={disabled}
              fullWidth
              {...errors}
              {...rest}
              {...field}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </InputMask>
      </Styled.FormControl>
    );
  }),
);

export { Input };
