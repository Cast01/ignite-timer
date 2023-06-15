import styled from 'styled-components';

interface LayoutContainerPropType {
  screenHeight: number;
}

export const LayoutContainer = styled.div<LayoutContainerPropType>`
  max-width: 112rem;
  min-height: calc(80rem - 16rem);
  height: 100vh;
  max-height: calc(
    ${({ screenHeight }: LayoutContainerPropType) => `${screenHeight}px`} -
      16rem
  );

  margin: 0 auto;

  padding: 4rem;

  border-radius: 8px;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme['gray-800']};

  @media (max-width: 1024px) {
    min-height: 65rem;
    height: 100vh;
    max-height: ${({ screenHeight }: LayoutContainerPropType) =>
      `${screenHeight}px`};

    border-radius: 0;
  }

  @media (max-width: 530px) {
    padding: 1.5rem;
  }
`;
