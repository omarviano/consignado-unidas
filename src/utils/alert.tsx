import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

import { CardWithCloseIcon } from 'components/CardWithCloseIcon';

export interface Confirm {
  content: React.ReactNode;
}

export default ({ content }: Confirm): void => {
  confirmAlert({
    closeOnClickOutside: true,
    closeOnEscape: true,
    customUI: ({ onClose }) => (
      <CardWithCloseIcon onClickCloseButton={onClose}>
        {content}
      </CardWithCloseIcon>
    ),
  });
};
