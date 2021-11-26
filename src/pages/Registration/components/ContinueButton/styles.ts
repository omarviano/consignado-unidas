import styled from 'styled-components';
import { Button } from 'components/Buttons/Button';

export const ContinueButton = styled(Button)`
  display: flex;
  align-items: center;
  margin: 64px auto 64px 0;
  max-width: 230px;

  svg {
    margin-left: 16px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 36px 0;
  }
`;
