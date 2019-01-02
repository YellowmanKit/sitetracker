import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import Database from './Database';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}><App db={new Database()}/></Provider>
  , document.getElementById('root'));
registerServiceWorker();
