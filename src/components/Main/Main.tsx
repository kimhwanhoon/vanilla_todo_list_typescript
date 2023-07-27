import React, { useState } from 'react';
import InputContainer from './WriteTodo/InputContainer';
import { styled } from 'styled-components';

const Main: React.FC = (): JSX.Element => {
  const [todoDB, setTodoDB] = useState<string[]>([]);
  return (
    <StyledMain>
      <InputContainer setTodoDB={setTodoDB} />
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled.main``;
