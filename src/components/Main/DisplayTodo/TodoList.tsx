import React from 'react';
import { styled } from 'styled-components';
import { todoDBStateType, todoDBType } from '../../../types';

const TodoList: React.FC<todoDBStateType> = ({ todoDB, setTodoDB }) => {
  return (
    <StyledTodoDisplay>
      {todoDB?.map((todo: todoDBType): JSX.Element => {
        return (
          <StyledTodo key={todo.id}>
            <StyledTodoContent>{todo.todo}</StyledTodoContent>
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </StyledTodo>
        );
      })}
    </StyledTodoDisplay>
  );
};

export default TodoList;

const StyledTodoDisplay = styled.div`
  border: 0.1px salmon solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StyledTodo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.1px salmon solid;
  width: 50%;
  gap: 1rem;
`;

const StyledTodoContent = styled.p`
  flex: 1 1 auto;
`;
