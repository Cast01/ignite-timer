import styled from 'styled-components';

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
