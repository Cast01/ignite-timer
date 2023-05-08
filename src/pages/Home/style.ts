import styled from 'styled-components';

export const HomeContainer = styled.main`
  max-width: 65.6rem;
  width: 100%;
  height: 42.2rem;

  margin: 7.2rem auto 16rem;

  form {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    header {
      height: 4.4rem;

      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.8rem;

      font-size: 1.8rem;
      font-weight: bold;

      input {
        background-color: transparent;

        padding-top: 0.5rem;

        font-weight: bold;

        border-bottom: 3px solid ${(props) => props.theme['gray-500']};
      }

      input[type='text'] {
        height: 100%;

        flex: 1;

        text-align: center;
      }

      input[type='number'] {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        -moz-appearance: textfield;

        width: 7.2rem;
        height: 100%;
      }
    }

    section {
      height: 4.4rem;

      flex: 1;

      padding: 6rem 0 5.6rem;

      .countDown {
        width: 100%;
        height: 100%;

        display: flex;
        gap: 1.6rem;

        font-family: 'Roboto Mono', sans-serif;
        font-size: 16rem;

        position: relative;

        .units {
          width: 12.8rem;
          height: 100%;

          background-color: ${(props) => props.theme['gray-700']};

          border-radius: 8px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stopwatch {
          flex: 1;

          display: flex;

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
        }
      }
    }

    footer {
      height: 6.4rem;

      button {
        width: 100%;
        height: 100%;

        border-radius: 8px;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;

        font-size: 1.6rem;
        font-weight: bold;

        background-color: ${(props) => props.theme['green-500']};
      }
    }
  }
`;
