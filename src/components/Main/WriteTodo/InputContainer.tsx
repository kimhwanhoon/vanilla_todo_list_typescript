import React from 'react';
import { styled } from 'styled-components';
import TodoInput from './TodoInput';

const InputContainer: React.FC<{}> = (): JSX.Element => {
  return (
    <>
      <StyledTodoInputContainer>
        <h2>할 일을 작성해주세요.</h2>
        <TodoInput />
      </StyledTodoInputContainer>
    </>
  );
};

export default InputContainer;

const StyledTodoInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.1px salmon solid;

  h2 {
    margin-top: 1rem;
  }
`;
