import React from 'react';
import { styled } from 'styled-components';
import TodoInput from './TodoInput';

interface setTodoType {
  setTodoDB: (newValue: string[]) => void;
}

const InputContainer: React.FC<setTodoType> = ({ setTodoDB }): JSX.Element => {
  return (
    <StyledTodoInputContainer>
      <h2>할 일을 작성해주세요.</h2>
      <TodoInput setTodoDB={setTodoDB} />
    </StyledTodoInputContainer>
  );
};

export default InputContainer;

const StyledTodoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-top: 1rem;
  }
`;
