import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider, useSelector } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from "redux-persist/integration/react"

import './index.css'

import Root from './pages/Root.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register';
import Confirm from './pages/Confirm';
import AuthHome from './pages/AuthHome';
import VideoPage from './pages/VideoPage';
import UploadPage from './pages/UploadPage';

import ProtectedRoutes from './components/ProtectedRoutes';
import HomeSelector from './components/HomeSelector';
import UnprotectedRoutes from './components/UnprotectedRoutes';

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomeSelector />
        // element: <>helloooo</>
      },
      {
        path: "",
        element: <UnprotectedRoutes />,
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
            path: "/video",
            element: <VideoPage />
          },
          {
            path: "/upload",
            element: <UploadPage />
          }
        ]
      },
      {
        path: "",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/auth_test",
            element: <AuthHome />
          }
        ]
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
