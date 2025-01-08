import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import Login from './auth/Login';
import { setClientToken } from '../spotify';

const Layout = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const hash = window.location.search.split('=')[1];
      const storedToken = localStorage.getItem('token');
      //  const storedToken = localStorage.getItem('access_token');
      if (hash && !storedToken) {
        // const _token = hash.split('&')[0].split('=')[1]
        localStorage.setItem('token', hash);
        // localStorage.setItem('access_token', _token);
        setToken(hash);
        setClientToken(hash);
      }
      else {
        setToken(storedToken);
        setClientToken(storedToken);
      }
    };
    getToken();
  }, []);
  return !token ?
    <Login /> :
    (
      <div>
        <Header />
        <main className="y-6">
          <Outlet />
        </main>
      </div>
    )
}

export default Layout