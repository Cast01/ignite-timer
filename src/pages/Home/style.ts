import styled from 'styled-components';

export const HomeContainer = styled.main`
  max-width: 65.6rem;

  margin: 0 auto 0;

  padding-top: 7.2rem;

  display: flex;

  form {
    flex: 1;

    display: flex;
    flex-direction: column;
  }

  @media (max-width: 710px) {
    flex: 1;

    align-items: center;

    padding-top: 4.5rem;
  }

  @media (max-width: 530px) {
    padding-top: 4.5rem;
  }
`;

export const FormHeader = styled.header`
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
  }

  .minutesAmmountWrapper {
    display: flex;
    align-items: center;
    gap: 0.8rem;
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
  min-width: 150px;

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

export const FormFooter = styled.footer`
  height: 6.4rem;
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  height: 100%;

  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  font-size: 1.6rem;
  font-weight: bold;
  color: ${(props) => props.theme['gray-100']};
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${(props) => props.theme['red-500']};

  &:hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`;
