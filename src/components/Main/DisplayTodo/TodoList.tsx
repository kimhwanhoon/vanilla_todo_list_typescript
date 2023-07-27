import React from 'react';
import { styled } from 'styled-components';
import { todoDBStateType, todoDBType } from '../../../types';

const TodoList: React.FC<todoDBStateType> = ({ todoDB, setTodoDB }) => {
  console.log(todoDB);
  // 수정하기
  const editClickHandler = (id: number): void => {
    const newTodo: string | null | undefined =
      prompt('수정할 값을 입력해주세요.');
    if (!newTodo || todoDB === null) {
      return;
    }
    // filteredTodoDB = 해당 todo 값만 뺀 전체 todoDB
    const filteredTodoDB: todoDBType[] = todoDB.filter(
      (todo) => todo.id !== id
    );
    // edittedTodo = 수정완료된 todo
    const edittedTodo: Required<todoDBType> = {
      id,
      todo: newTodo,
    };
    // filteredTodoDB와 edittedTodo를 합쳐 최종으로 새로운 todoDB 저장
    setTodoDB([...filteredTodoDB, edittedTodo]);
  };
  //
  //
  // 삭제하기
  const deleteClickHandler = (id: number): void => {
    if (!confirm('삭제하시겠습니까?') || todoDB === null) {
      return;
    }
    // filteredTodoDB = 해당 todo 값만 뺀 전체 todoDB
    const filteredTodoDB: todoDBType[] = todoDB.filter(
      (todo) => todo.id !== id
    );
    setTodoDB(filteredTodoDB);
  };
  return (
    <TodoListContainerS>
      {todoDB?.map((todo: todoDBType): JSX.Element => {
        return (
          <TodoContainerS key={todo.id}>
            <TodoContentS>{todo.todo}</TodoContentS>
            <ButtonContainerS>
              <button onClick={() => editClickHandler(todo.id)}>수정</button>
              <button onClick={() => deleteClickHandler(todo.id)}>삭제</button>
            </ButtonContainerS>
          </TodoContainerS>
        );
      })}
    </TodoListContainerS>
  );
};

export default TodoList;

const TodoListContainerS = styled.div`
  width: 70%;
  border: 0.1px salmon solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const TodoContainerS = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.1px salmon solid;
  width: 50%;
  gap: 1rem;
  height: 2rem;
`;

const TodoContentS = styled.p`
  flex: 1 1 auto;
  padding: 0 0.4rem;
`;

const ButtonContainerS = styled.div`
  display: flex;
  gap: 3px;
  height: 100%;
  & > * {
  }
`;
