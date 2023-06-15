import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 710px) {
    flex: initial;
  }

  img {
    width: 4rem;
    height: 4rem;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    line-height: 0;

    a {
      width: 4.8rem;
      height: 4.8rem;

      display: flex;
      justify-content: center;
      align-items: center;

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      color: ${(props) => props.theme['gray-100']};

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`;
