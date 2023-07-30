import React from 'react';
import { styled } from 'styled-components';
import TodoList from './TodoList';

const DisplayTodoContainer: React.FC<{}> = () => {
  return (
    <StyledDiv>
      <StyledTitleDiv>
        <h3>할 일 목록</h3>
      </StyledTitleDiv>
      <TodoList />
    </StyledDiv>
  );
};

export default DisplayTodoContainer;

const StyledDiv = styled.div`
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
`;
