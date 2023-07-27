import React, { ChangeEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { todoDBStateType, todoDBType } from '../../../types';

const TodoInput: React.FC<todoDBStateType> = ({
  todoDB,
  setTodoDB,
}): JSX.Element => {
  // console.log('Rendered(TodoInput)');
  const [todoValue, setTodoValue] = useState<string>('');
  const todoInputRef = useRef<HTMLInputElement>(null);
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
    const newData: todoDBType = {
      id: Date.now(),
      todo: todoValue,
    };
    // 'todoDB'의 초기값은 null이다.
    if (todoDB === null) {
      setTodoDB([newData]);
      return;
    }
    // 'todoDB'의 초기값이 null이 아니면, 기존의 todoDB에 데이터 추가하기
    setTodoDB([...todoDB, newData]);
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
