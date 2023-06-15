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
