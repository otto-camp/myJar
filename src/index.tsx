import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SSRProvider } from 'react-bootstrap';
import Mainpage from './layouts/Mainpage';
import { disableReactDevTools } from './DisableReactDevTools';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SSRProvider>
        <Mainpage />
      </SSRProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

if (process.env.NODE_ENV === 'production') disableReactDevTools();
