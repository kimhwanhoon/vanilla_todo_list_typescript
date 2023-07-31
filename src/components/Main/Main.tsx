import React from 'react';
import InputContainer from './WriteTodo/InputContainer';
import { styled } from 'styled-components';
import DisplayTodoContainer from './DisplayTodo/DisplayTodoContainer';
import { useQuery } from '@tanstack/react-query';
import { getTodoDB } from '../../axios/dbApi';

const Main: React.FC = (): JSX.Element => {
  useQuery({ queryKey: ['todoList'], queryFn: getTodoDB });
  // console.log('query', query);
  return (
    <>
      <StyledMain>
        <InputContainer />
        <DisplayTodoContainer />
      </StyledMain>
    </>
  );
};

export default Main;

const StyledMain = styled.main``;
