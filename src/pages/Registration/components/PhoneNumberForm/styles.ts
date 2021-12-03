import styled from 'styled-components';
import { Input } from 'components/Inputs/Input';

export const PhonenumberInput = styled(Input)`
  max-width: 450px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
