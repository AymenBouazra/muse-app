import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Player from '../components/Player'
import { useEffect, useState } from 'react';
import Login from './auth/Login';
import { setClientToken } from '../spotify';

const Layout = () => {
 const [token, setToken] = useState('');

 useEffect(() => {
  const getToken = async () => {
   const hash = window.location.hash;
   const storedToken = localStorage.getItem('access_token');
   if (hash && !storedToken) {
    const _token = hash.split('&')[0].split('=')[1]
    localStorage.setItem('access_token', _token);
    setToken(_token);
    setClientToken(_token);
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
    <main className="0y-6">
     <Outlet />
    </main>
    <Player />
   </div>
  )
}

export default Layout