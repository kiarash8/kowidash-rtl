import React from 'react';
import ReactDOM from 'react-dom';
import {Store} from './store';
import './index.scss';
import App from './App';

ReactDOM.render(
    <Store.Provider>
        <App />
    </Store.Provider>,
  document.getElementById('root')
);