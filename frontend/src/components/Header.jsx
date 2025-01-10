import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Music, LogIn } from 'lucide-react';
import SearchBar from './SearchBar';
import { logout } from '../API/authApi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user-data")));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
    await logout("/auth/logout");
    navigate("/auth");
  };

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
          <nav className="hidden md:flex space-x-8 items-center">
            <div>
              <SearchBar />
            </div>
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
            {/* Profile Dropdown or Sign Up Button */}
            {
              localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null ?
                <div className='relative'>
                  {/* Dropdown Toggle Button */}
                  <button className='dropdown-toggle' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img src={userData?.picture} alt="user-image" className="w-8 h-8 rounded-full" />
                  </button>

                  {/* Dropdown Content */}
                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg'>
                      {/* User Name Section */}
                      <div className='px-4 py-2 border-b'>
                        <div className='flex items-center space-x-2'>
                          <img src={userData?.picture} alt="user-image" className="w-6 h-6 rounded-full" />
                          <span className='text-sm font-bold text-gray-700'>{userData?.name}</span>
                        </div>
                      </div>

                      {/* Dropdown Items */}
                      <ul>
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                :
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 bg-green-400 text-black px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login / Sign Up</span>
                </Link>
            }
          </nav>

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
          <SearchBar />
          <div className="pt-2 pb-5 flex flex-col">
            {['', 'Music'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-white hover:bg-purple-500 transform hover:translate-x-2 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)} // Close mobile menu on click
              >
                {item !== '' ? item : 'Home'}
              </Link>
            ))}

            {/* Mobile Dropdown for Logged-In Users */}
            {localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null ? (
              <div className='px-3 py-2'>
                <button
                  className='w-full flex items-center space-x-2'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img src={userData?.picture} alt="user-image" className="w-8 h-8 rounded-full" />
                  <span className='text-white'>{userData?.name}</span>
                </button>

                {/* Mobile Dropdown Content */}
                {isDropdownOpen && (
                  <div className='mt-2 bg-white rounded-md shadow-lg'>
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => {
                            setIsDropdownOpen(false); // Close dropdown on click
                            setIsMenuOpen(false); // Close mobile menu on click
                          }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex justify-center items-center space-x-2 bg-green-400 text-black px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)} // Close mobile menu on click
              >
                <div className='flex justify-center items-center gap-3'>
                  <LogIn className="w-5 h-5" />
                  <span>Login / Sign Up</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;