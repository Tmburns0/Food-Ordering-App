import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { BrowserRouter as Router, } from "react-router-dom";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
    </Router>
  </StrictMode>
);
