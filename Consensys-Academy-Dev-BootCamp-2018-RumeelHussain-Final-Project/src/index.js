import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

import { Provider } from "react-redux";
import store from "./redux/store/store";

ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>, document.getElementById('root'));
registerServiceWorker();
