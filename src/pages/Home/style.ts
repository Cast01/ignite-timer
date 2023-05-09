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
  }
`;

export const FormHeader = styled.header`
  height: 4.4rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;

  font-size: 1.8rem;
  font-weight: bold;

  #task {
    height: 100%;

    flex: 1;

    position: relative;

    datalist option {
      background: red !important;

      &:hover {
        background: red;
      }
    }
  }
`;

export const BaseInput = styled.input`
  background-color: transparent;

  padding-top: 0.5rem;

  font-weight: bold;

  text-align: center;

  border-bottom: 3px solid ${(props) => props.theme['gray-500']};

  &:focus {
    box-shadow: none;
    border-bottom: 3px solid ${(props) => props.theme['green-500']};
  }

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme['green-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  width: 100%;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmmountInput = styled(BaseInput)`
  width: 7.2rem;
  height: 100%;
`;

export const CountDownContainer = styled.div`
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

    .countDownSeparator {
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
`;

export const FormFooter = styled.footer`
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

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['green-700']};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;
