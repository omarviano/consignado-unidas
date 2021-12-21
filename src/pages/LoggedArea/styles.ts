import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: flex;

  > div {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
