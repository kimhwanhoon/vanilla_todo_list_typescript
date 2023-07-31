import React from 'react';
import InputContainer from './WriteTodo/InputContainer';
import { styled } from 'styled-components';
import DisplayTodoContainer from './DisplayTodo/DisplayTodoContainer';
import { useAppDispatch } from '../../redux/config/configStore';
import { __fetchTodoDB } from '../../redux/modules/todo';

const Main: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  dispatch(__fetchTodoDB());
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
