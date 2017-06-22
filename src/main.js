import React from 'react';
import styled from 'styled-components';

import Button from './components/button';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Main = () =>
  <Wrapper>
    <Button type="button">Start game</Button>
  </Wrapper>;

export default Main;
