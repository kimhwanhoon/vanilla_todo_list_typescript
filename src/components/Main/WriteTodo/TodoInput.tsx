import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { T_todo } from '../../../redux/modules/todo';
import { addTodoDB } from '../../../axios/dbApi';
import short from 'short-uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TodoInput: React.FC<{}> = (): JSX.Element => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const todoVal = useRef<string>('');

  //
  const queryClient = useQueryClient();
  // 새로운 todo 추가 함수
  const mutation = useMutation({
    mutationFn: addTodoDB,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['todoList'],
      });
    },
  });

  // 작성하기
  const postClickHandler = (): void => {
    if (!todoVal.current || todoInputRef.current === null) {
      alert('할 일을 적어주세요.');
      todoInputRef.current?.focus();
      return;
    }
    // input값과 id를 저장
    const newData: T_todo = {
      id: short.generate(),
      todo: todoVal.current,
    };
    mutation.mutate(newData);
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
