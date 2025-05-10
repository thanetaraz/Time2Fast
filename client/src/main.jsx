import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Register from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/register', element: <Register /> },
  { path: '/*', element: <PageNotFound /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
