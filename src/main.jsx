import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App'
import { AuthEmailProvider } from './contexts/AuthEmailProvider';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthEmailProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthEmailProvider>
  </React.StrictMode>,
)
