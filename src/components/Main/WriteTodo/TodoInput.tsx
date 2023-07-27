import React, { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';

interface setTodoType {
  setTodoDB: (newValue: string[]) => void;
}

const TodoInput: React.FC<setTodoType> = ({ setTodoDB }): JSX.Element => {
  const [todoValue, setTodoValue] = useState<string>('');
  const postClickHandler = () => {};
  return (
    <StyledDiv>
      <input
        type="text"
        value={todoValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodoValue(e.target.value)
        }
      />
      <button>작성하기</button>
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
