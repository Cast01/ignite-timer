import styled from 'styled-components';

export const LayoutContainer = styled.div`
  max-width: 112rem;
  min-height: calc(100vh - 16rem);

  margin: 0 auto;

  padding: 4rem;

  border-radius: 8px;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme['gray-800']};

  @media (max-width: 1024px) {
    min-height: 100vh;

    border-radius: 0;
  }

  @media (max-width: 530px) {
    padding: 1.5rem;
  }
`;
