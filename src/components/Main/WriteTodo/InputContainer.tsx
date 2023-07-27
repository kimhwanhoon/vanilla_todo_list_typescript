import React from 'react';
import { styled } from 'styled-components';
import TodoInput from './TodoInput';
import { todoDBStateType } from '../../../types';

const InputContainer: React.FC<todoDBStateType> = ({
  todoDB,
  setTodoDB,
}): JSX.Element => {
  // console.log('Rendered(InputContainer)');
  return (
    <StyledTodoInputContainer>
      <h2>할 일을 작성해주세요.</h2>
      <TodoInput
        todoDB={todoDB}
        setTodoDB={setTodoDB}
      />
    </StyledTodoInputContainer>
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
