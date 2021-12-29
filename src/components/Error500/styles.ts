import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 178px 128px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100% !important;
    min-height: auto !important;
    padding: 100px 32px;
  }
`;

export const Title = styled.div`
  color: #848484;
  font-weight: bold;
  font-size: 80px;
  line-height: 94px;
  letter-spacing: 0.2px;
  opacity: 0.4;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const SubTitle = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0.2px;
  color: #646464;
`;
