import React from 'react';
import { styled } from 'styled-components';
import { todoDBStateType } from '../../../types';
import TodoList from './TodoList';

const DisplayTodoContainer: React.FC<todoDBStateType> = ({
  todoDB,
  setTodoDB,
}) => {
  return (
    <StyledDiv>
      <StyledTitleDiv>
        <h3>할 일 목록</h3>
      </StyledTitleDiv>

      <TodoList
        todoDB={todoDB}
        setTodoDB={setTodoDB}
      />
    </StyledDiv>
  );
};

export default DisplayTodoContainer;

const StyledDiv = styled.div`
  border: 0.1px salmon solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: 0.1px salmon solid;
`;
