import styled from 'styled-components';

export const TableContainer = styled.div`
  flex: 1;

  overflow: auto;

  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  margin-top: 3.2rem;

  &::-webkit-scrollbar {
    width: 5px; /* width of the entire scrollbar */
    height: 5px;

    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -20px;
      right: 0;

      /* background-color: ${(props) => props.theme['gray-800']}; */
      background-color: blue;

      width: 16rem;
      height: 16rem;

      z-index: 99;
    }
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme['gray-500']}; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }

  table {
    width: 100%;
    min-width: 600px;

    border-collapse: collapse;

    position: relative;

    thead {
      position: sticky;
      top: 0;

      width: 100%;

      tr {
        th {
          background-color: ${(props) => props.theme['gray-600']};

          padding: 1.6rem;

          text-align: left;
          color: ${(props) => props.theme['gray-100']};
          font-size: 1.4rem;
          line-height: 1.6;

          &:first-child {
            border-top-left-radius: 8px;
            overflow: hidden;
          }

          &:last-child {
            border-top-right-radius: 8px;
            overflow: hidden;
          }
        }
      }
    }

    tbody {
      tr {
        td {
          background-color: ${(props) => props.theme['gray-700']};
          border-top: 4px solid ${(props) => props.theme['gray-800']};

          padding: 1.6rem;

          font-size: 1.4rem;

          line-height: 1.6;
        }
      }
    }
  }
`;

const STATUS_COLOR = {
  green: 'green-500',
  red: 'red-500',
  yellow: 'yellow-500',
} as const;

type StatusProps = {
  statusColor: keyof typeof STATUS_COLOR;
};

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: '';

    width: 0.8rem;
    height: 0.8rem;

    border-radius: 50%;

    background-color: ${(props) =>
      props.theme[STATUS_COLOR[props.statusColor]]};
  }
`;
