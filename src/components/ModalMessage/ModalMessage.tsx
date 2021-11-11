import React from 'react';

import { Modal } from 'components/Modal';

import * as Styled from './styles';
import { ModalMessageProps } from './props';

const ModalMessage: React.FC<ModalMessageProps> = ({
  icon,
  title,
  text,
  width = '450px',
  height = '250px',
  ...rest
}) => (
  <Modal {...rest}>
    <Styled.Container style={{ width, minHeight: height }}>
      {icon}
      {title && <Styled.Title>{title}</Styled.Title>}
      {text && <Styled.Text>{text}</Styled.Text>}
    </Styled.Container>
  </Modal>
);

export { ModalMessage };
