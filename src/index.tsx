import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { register } from './serviceWorker';
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

register();
reportWebVitals();
