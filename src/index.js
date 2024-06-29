import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/global.scss';
import "react-toastify/dist/ReactToastify.css";
import './i18n';
import { ModalProvider } from './context/ModalContext';
import { Notification } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ModalProvider>
      <App />
      <Notification />
    </ModalProvider>
    <ToastContainer style={{ zIndex: 100000000 }} />
  </BrowserRouter>
);
