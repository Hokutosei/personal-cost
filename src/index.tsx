import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Hexabase } from 'hexabase-sdk';
import {Provider} from 'react-redux';
import {store} from './store';

Hexabase.initializeApp({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
