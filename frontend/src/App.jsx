import 'react-h5-audio-player/lib/styles.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense } from 'react';

const Login = React.lazy(() => import('./pages/auth/Login'));
const Layout = React.lazy(() => import('./pages/Layout'));
const ErrorPage = React.lazy(() => import('./pages/errors/Error404'));
const MusicList = React.lazy(() => import('./pages/MusicList'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Tracks = React.lazy(() => import('./pages/Tracks'));
const Playlist = React.lazy(() => import('./pages/MyPlaylist'));

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/music',
        element: <MusicList />,
      },
      {
        path: '/music/tracks',
        element: <Tracks />,
      },
      {
        path: '/music/playlist/:id',
        element: <Playlist />,
      }
    ],
  },
]);

const App = () => {
  return <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>;
};

export default App;
