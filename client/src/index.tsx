import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CssBaseline} from '@mui/material'

ReactDOM.hydrate(
  <React.StrictMode>
    <CssBaseline/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
