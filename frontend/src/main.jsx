import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './pages/Root';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <div>loggin ye in</div>
      },
      {
        path: "/signup",
        element: <div>signing you up</div>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
