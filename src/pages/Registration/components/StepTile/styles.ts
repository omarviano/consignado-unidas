import styled from 'styled-components';

export const Container = styled.p`
  max-width: 700px;
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  letter-spacing: 0.2px;
  color: #646464;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;
