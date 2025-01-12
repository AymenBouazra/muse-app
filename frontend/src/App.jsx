import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense } from 'react';
import { ToastBar, Toaster } from 'react-hot-toast';
import PrivateRoute from './PrivateRoute/PrivateRoute';

// Lazy-loaded components
const Authentication = React.lazy(() => import('./pages/auth/Authentication'));
const Layout = React.lazy(() => import('./pages/Layout'));
const ErrorPage = React.lazy(() => import('./pages/errors/Error404'));
const MusicList = React.lazy(() => import('./pages/MusicList'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Playlist = React.lazy(() => import('./pages/MyPlaylist'));
const Player = React.lazy(() => import('./components/Player'));
const SearchedList = React.lazy(() => import('./pages/SearchedList'));
const Profile = React.lazy(() => import('./pages/Profile'));

// Router configuration
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Authentication />,
  },
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/music',
        element: (
          <PrivateRoute>
            <MusicList />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-playlist',
        element: (
          <PrivateRoute>
            <Playlist />
          </PrivateRoute>
        ),
      },
      {
        path: '/music/search',
        element: (
          <PrivateRoute>
            <SearchedList />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        <Player />
      </Suspense>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#4F46E5', // Purple background
            color: '#FFFFFF', // White text
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease forwards',
            }}
          />
        )}
      </Toaster>
    </>
  );
};

export default App;