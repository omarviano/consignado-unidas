import styled from 'styled-components';

export const ContentTextInformation = styled.ul`
  list-style: initial;
`;

export const TextInformation = styled.li`
  font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => theme.palette.grey[500]};
  cursor: default;
  padding-left: 0px;

  &:first-child {
    font-weight: bold;
    margin-bottom: 6px;
  }

  &:nth-child(2) {
    margin-bottom: 24px;

    @media (max-width: 1000px) {
      margin-bottom: 18px;
    }
  }
`;
