import React from 'react';
import InputContainer from './WriteTodo/InputContainer';
import { styled } from 'styled-components';
import DisplayTodoContainer from './DisplayTodo/DisplayTodoContainer';
import useFetchTodoDB from '../../hooks/fetchTodoDB';

const Main: React.FC = (): JSX.Element => {
  useFetchTodoDB();
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
