import styled from 'styled-components';

export const Container = styled.div`
  max-width: 589px;
  max-height: 500px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  padding: 120px 120px 70px;
  background-color: ${({ theme }) => theme.palette.primary.contrastText};
  border-radius: 8px;

  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin: 0 16px 0 16px;
    padding: 16px 16px 28px;
  }
`;
