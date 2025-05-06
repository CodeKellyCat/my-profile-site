import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from "./router/AppRouter.jsx";
import "normalize.css";
import "./styles/global.css";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
