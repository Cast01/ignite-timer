import styled from 'styled-components';

export const LayoutContainer = styled.div`
  max-width: 112rem;
  height: calc(100vh - 16rem);

  margin: 0 auto;

  padding: 4rem;

  border-radius: 8px;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme['gray-800']};
`;
