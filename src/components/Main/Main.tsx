import React, { useState } from 'react';
import InputContainer from './WriteTodo/InputContainer';
import { styled } from 'styled-components';
import { todoDBType } from '../../types';
import DisplayTodoContainer from './DisplayTodo/DisplayTodoContainer';

const Main: React.FC = (): JSX.Element => {
  // console.log('Rendered(Main)');
  const [todoDB, setTodoDB] = useState<todoDBType[] | null>(null);
  // console.log('todoDB:', todoDB);
  return (
    <StyledMain>
      <InputContainer
        todoDB={todoDB}
        setTodoDB={setTodoDB}
      />
      <DisplayTodoContainer
        todoDB={todoDB}
        setTodoDB={setTodoDB}
      />
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled.main``;
