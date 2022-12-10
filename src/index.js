import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MemberRolesProvider } from './context/MemberRoleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MemberRolesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MemberRolesProvider>
);
