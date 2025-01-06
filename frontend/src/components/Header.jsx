import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Music } from 'lucide-react';
import spotifyImg from '/assets/img/spotify.png'
import apiClient from '../spotify';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [avatar, setAvatar] = useState(spotifyImg);
  const [profile, setProfile] = useState();


  useEffect(() => {
    apiClient.get('me').then(res => {
      console.log(res);
      setAvatar(res.data.images[0].url);
      setProfile(res.data);
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-purple-900 text-white'
        }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white hover:text-pink-300 transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <Music className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-white">Muse</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['', 'Music'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="relative text-white group"
              >
                <span className="relative z-10">{item !== '' ? item : 'Home'}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <span className="flex gap-2 items-center justify-center text-white bg-slate-800 hover:text-green-400 cursor-pointer transition-colors rounded-md p-1"><img src={avatar} alt='avatar' className='w-8 h-8 rounded-full' /> {profile?.display_name}</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-pink-300 p-2 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="pt-2 pb-5 ">
            {['Home', 'Products', 'Services', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-white hover:bg-purple-500 
            transform hover:translate-x-2 transition-all duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;