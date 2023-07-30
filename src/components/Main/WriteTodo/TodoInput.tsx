import React, { useRef } from 'react';
import { styled } from 'styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/config/configStore';
import { T_todo, updateTodo } from '../../../redux/modules/todo';
import { addTodoDB } from '../../../axios/dbApi';

const TodoInput: React.FC<{}> = (): JSX.Element => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const todoVal = useRef<string>('');
  const dispatch = useAppDispatch();

  const todoDB = useAppSelector((state) => state.todoList);
  console.log(todoDB);
  // 작성하기
  const postClickHandler = (): void => {
    if (!todoVal.current || todoInputRef.current === null) {
      alert('할 일을 적어주세요.');
      todoInputRef.current?.focus();
      return;
    }
    // input값과 id를 저장
    const newData: T_todo = {
      id: Date.now(),
      todo: todoVal.current,
    };
    const updatedTodoDB = [...todoDB, newData];
    addTodoDB(updatedTodoDB);
    dispatch(updateTodo(updatedTodoDB));
    todoVal.current = '';
    todoInputRef.current.value = '';
  };

  return (
    <StyledDiv>
      <input
        type="text"
        ref={todoInputRef}
        onChange={(e) => (todoVal.current = e.target.value)}
      />
      <button onClick={postClickHandler}>작성하기</button>
    </StyledDiv>
  );
};

export default TodoInput;

const StyledDiv = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > * {
    width: 100%;
  }
`;
