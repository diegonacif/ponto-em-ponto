import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App'
import { AuthEmailProvider } from './contexts/AuthEmailProvider';
import { ClockProvider } from './contexts/ClockProvider';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { PrivateRoutes } from './privateRoutes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* <ClockProvider> */}
    <AuthEmailProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<App />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </AuthEmailProvider>
      {/* </ClockProvider> */}
  </React.StrictMode>,
)
