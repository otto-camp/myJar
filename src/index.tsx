import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Mainpage from './layouts/Mainpage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Mainpage />
  </React.StrictMode>
);

reportWebVitals();
