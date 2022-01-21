import styled from 'styled-components';
import TypographyStyles from '@mui/material/Typography';

interface ExpandableCardProps {
  open: boolean;
}

export const Container = styled.div`
  position: relative;
  padding: 22px 32px 24px;

  @media (max-width: 720px) {
    padding: 16px 24px 100px;
  }
`;

export const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  max-width: 1286px;
  padding: 31px 56px;

  @media (max-width: 768px) {
    box-shadow: none;
    background: none;
    padding: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 45px;

  .button-container {
    margin-left: auto;
  }

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-right: 32px;
`;

export const BreadcrumbRoot = styled.div`
  text-decoration-line: underline;
  margin-right: 8px;
`;

export const BreadcrumbPage = styled.div`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.grey[100]};
`;

export const ExpandableCard = styled.div<ExpandableCardProps>`
  position: relative;
  margin-bottom: 56px;
  background: #ffffff;

  button {
    display: none;
    margin: 8px auto -20px;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
    box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
    border-radius: 4px;
    padding: 16px;

    .data-container {
      height: ${({ open }) => (open ? 'auto' : '44px')};
      overflow: hidden;
    }

    button {
      display: block;
    }
  }
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  margin-left: 18px;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 32px 0 0;
  }
`;

export const StatusLabel = styled(TypographyStyles)`
  color: ${({ theme }) => theme.palette.grey[100]};
`;

export const StatusText = styled(TypographyStyles)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.grey[200]};

  svg {
    width: 16px;
    height: 16px;
    margin: 0 8px 0 4px;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  gap: 28px 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Data = styled.div`
  &:first-child {
    display: flex;
    width: 100%;

    p:last-child {
      font-size: 21px;
      margin-left: 8px;

      @media (max-width: 720px) {
        font-size: 18px;
        margin-left: 0;
      }
    }

    @media (max-width: 720px) {
      display: block;
    }
  }
`;

export const DataLabel = styled(TypographyStyles)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[100]};
  margin-bottom: 8px;
`;

export const DataValue = styled(TypographyStyles)`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.grey[400]};
  text-transform: capitalize;
`;

export const InstallmentsContainer = styled.div`
  box-shadow: 0px 2px 6px rgba(46, 43, 80, 0.25);
  border-radius: 4px;
  padding: 16px;
  background: #ffffff;

  .loading {
    display: block;
    margin: auto;
  }
`;

export const InstallmentsTitle = styled(TypographyStyles)`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export const Installments = styled.div`
  padding: 0 12px 64px;
`;

export const CapitalizeCenter = styled.div`
  width: 100%;
  text-transform: capitalize;
  text-align: center;
`;
