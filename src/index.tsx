import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SSRProvider } from 'react-bootstrap';
import Mainpage from './layouts/Mainpage';

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
