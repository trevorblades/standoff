import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {
  FONT_FAMILY_MONOSPACE,
  GRAY_DARKER,
  GRAY_DARKEST,
  PADDING_BASE,
  PADDING_SMALL
} from '../variables';

const Wrapper = styled.button`
  padding: ${PADDING_SMALL} ${PADDING_BASE};
  border: none;
  font-family: ${FONT_FAMILY_MONOSPACE};
  color: white;
  text-transform: uppercase;
  background: black;
  cursor: pointer;
  outline: none;
  &:hover {
    background: ${GRAY_DARKEST};
  }
  &:active {
    background: ${GRAY_DARKER};
  }
`;

const Button = props =>
  <Wrapper
    className={props.className}
    onClick={props.onClick}
    type={props.type}
  >
    {props.children}
  </Wrapper>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
