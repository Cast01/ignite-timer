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
