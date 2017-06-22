import {normalize} from 'polished';
import {injectGlobal} from 'styled-components';

import {FONT_FAMILY_SANS_SERIF, FONT_SIZE_BASE} from './variables';

export default () => injectGlobal`
  ${normalize()}

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-family: ${FONT_FAMILY_SANS_SERIF};
    font-size: ${FONT_SIZE_BASE};
  }

  body {
    overflow: hidden;
  }
`;
