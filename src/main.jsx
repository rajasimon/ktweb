import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login/index.jsx'
import Test from './pages/Test/index.jsx'
import Result from './pages/Result/index.jsx'
import Logout from './pages/Logout/index.jsx'

import { AuthProvider } from './auth.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: "/result",
    element: <Result />
  },
  {
    path: "/logout",
    element: <Logout />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
