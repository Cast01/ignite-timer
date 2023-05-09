import styled from 'styled-components';

export const HistoryContainer = styled.main`
  height: 50rem;

  overflow: hidden;

  padding: 5.6rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.4rem;
    color: ${(props) => props.theme['gray-100']};
  }
`;

export const TableContainer = styled.div`
  flex: 1;

  overflow: auto;

  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  margin-top: 3.2rem;

  table {
    width: 100%;
    /* min-width: 600px; */

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

          &:first-child {
            width: 50%;
          }
        }
      }
    }
  }

  &::-webkit-scrollbar {
    width: 5px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme['gray-500']}; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;
