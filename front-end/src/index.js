import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Store} from "./Store/Store";

ReactDOM.render(
    <React.StrictMode>
        <Store>
            <App/>
        </Store>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();