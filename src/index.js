import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/global.scss';
import "react-toastify/dist/ReactToastify.css";
import './i18n';
import { ModalProvider } from './context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
    <ToastContainer style={{ zIndex: 100000000 }} />
  </BrowserRouter>
);
