import React from 'react';
import { styled } from 'styled-components';

const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <h1>할 일</h1>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid salmon;
`;
