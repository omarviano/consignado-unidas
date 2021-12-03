import styled from 'styled-components';
import { Input } from 'components/Inputs/Input';

export const ContentCPFInput = styled.div`
  margin-top: 60px;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const CPFInput = styled(Input)`
  max-width: 450px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
