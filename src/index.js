import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Main from './main';
import styles from './styles';

const render = (Component, props = {}) => {
  styles();
  ReactDOM.render(
    <AppContainer>
      <Component {...props} />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Main);
if (module.hot) {
  module.hot.accept('./main', () => {
    render(Main);
  });
}
