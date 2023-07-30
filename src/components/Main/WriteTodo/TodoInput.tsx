import React, { ChangeEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useAppDispatch } from '../../../redux/config/configStore';
import { T_todo, postTodo } from '../../../redux/modules/todo';

const TodoInput: React.FC<{}> = (): JSX.Element => {
  const [todoValue, setTodoValue] = useState<string>('');
  const todoInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  //
  // Input => onChange
  const todoInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  // 작성하기 => input을 todoDB에 저장
  const postClickHandler = (): void => {
    if (!todoValue) {
      alert('할 일을 적어주세요.');
      todoInputRef.current?.focus();
      return;
    }
    setTodoValue('');
    // input값과 id를 저장
    const newData: T_todo = {
      id: Date.now(),
      todo: todoValue,
    };
    dispatch(postTodo(newData));
  };

  return (
    <StyledDiv>
      <input
        type="text"
        ref={todoInputRef}
        value={todoValue}
        onChange={(e) => todoInputOnChange(e)}
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
