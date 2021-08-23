import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { saveState } from './localStorage';
import store from './app/store';
import './index.css';

store.subscribe(() => {
  saveState({
    shoppingCartProducts: store.getState().shoppingCartProducts,
    viewedProductHistory: store.getState().viewedProductHistory,
    searchedTermHistory: store.getState().searchedTermHistory,
  });
});

function render() {
  const App = require('./app/App').default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}
