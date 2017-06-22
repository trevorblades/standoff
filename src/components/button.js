import {lighten} from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled, {css} from 'styled-components';

import {
  FONT_FAMILY_MONOSPACE,
  GRAY_LIGHTER,
  PADDING_BASE,
  PADDING_SMALL
} from '../variables';

const Wrapper = styled.button`
  padding: ${PADDING_SMALL} ${PADDING_BASE};
  border: none;
  font-family: ${FONT_FAMILY_MONOSPACE};
  color: white;
  text-transform: uppercase;
  ${props =>
    props.disabled
      ? css`
    background: ${GRAY_LIGHTER};
  `
      : css`
    background: ${props.backgroundColor};
    cursor: pointer;
    &:hover {
      background: ${lighten(0.1, props.backgroundColor)};
    }
    &:active {
      background: ${lighten(0.2, props.backgroundColor)};
    }
  `}
  outline: none;
`;

const Button = props =>
  <Wrapper
    backgroundColor={props.backgroundColor}
    className={props.className}
    disabled={props.disabled}
    onClick={props.onClick}
    type={props.type}
  >
    {props.children}
  </Wrapper>;

Button.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

Button.defaultProps = {
  backgroundColor: 'black',
  type: 'button'
};

export default Button;
