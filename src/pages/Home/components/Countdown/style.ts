import styled from 'styled-components';

export const CountDownContainer = styled.div`
  height: 4.4rem;

  flex: 1;

  padding: 3rem 0 3rem;

  .countDown {
    width: 100%;
    height: 100%;

    display: flex;
    gap: 1.6rem;

    font-family: 'Roboto Mono', sans-serif;
    font-size: 16rem;

    position: relative;

    @media (max-width: 530px) {
      flex-direction: column;
      align-items: center;

      font-size: 13rem;
    }

    .minutes {
      height: fit-content;

      display: flex;
      gap: 1.6rem;

      @media (max-width: 530px) {
        gap: 5.6rem;
      }

      @media (max-width: 300px) {
        gap: 1.6rem;
      }
    }

    .seconds {
      height: fit-content;

      display: flex;
      gap: 1.6rem;

      @media (max-width: 530px) {
        gap: 5.6rem;
      }

      @media (max-width: 300px) {
        gap: 1.6rem;
      }
    }

    .units {
      width: 12.8rem;
      height: 100%;

      background-color: ${(props) => props.theme['gray-700']};

      border-radius: 8px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .countDownSeparator {
      flex: 1;

      display: flex;

      margin: 0 1.6rem;

      &::before {
        content: '';

        position: absolute;
        top: calc(50% + 15px);
        left: 50%;
        transform: translateX(-50%);

        width: 3rem;
        height: 3rem;

        border-radius: 50%;

        background-color: ${(props) => props.theme['green-500']};
      }

      &::after {
        content: '';

        position: absolute;
        bottom: calc(50% + 15px);
        left: 50%;
        transform: translateX(-50%);

        border-radius: 50%;

        width: 3rem;
        height: 3rem;

        background-color: ${(props) => props.theme['green-500']};
      }

      @media (max-width: 530px) {
        transform: rotate(90deg);
        margin-top: 1.6rem;
        margin-bottom: 1.6rem;
      }
    }
  }
`;
