import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './pages/Root.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register';
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import Confirm from './pages/Confirm';
import ProtectedRoutes from './components/ProtectedRoutes';
import { PersistGate } from "redux-persist/integration/react"
import AuthHome from './pages/AuthHome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Register />
      },
      {
        path: "/confirm",
        element: <Confirm />
      },
      {
        path: "/*",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "auth_test/",
            element: <AuthHome />
          }
        ]
      },
      {
        path: "/",
        element: <div>saucey home page</div>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<>loading</>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
