import { useState, useContext } from 'react';
import { PlayerContext } from '../utils/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
 const [searchQuery, setSearchQuery] = useState('');
 const { setSearchResults } = useContext(PlayerContext);
 const navigate = useNavigate();

 const handleSearch = async (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
   // Fetch search results from the API
   const options = {
    method: 'GET',
    url: 'https://youtube-v31.p.rapidapi.com/search',
    params: {
     q: searchQuery,
     part: 'id,snippet',
     type: 'video',
     maxResults: '50',
    },
    headers: {
     'x-rapidapi-key': 'e0edd28e50msh9cf119170b61c3ep150d6ajsn4a430688035b',
     'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
    },
   };

   try {
    const response = await axios.request(options);
    setSearchResults(response.data.items); // Update search results in context
    navigate('/music/search?' + searchQuery); // Navigate to the SearchedList page
   } catch (error) {
    console.error(error);
   }
  }
 };

 return (
  <form onSubmit={handleSearch} className="flex items-center">
   <input
    type="text"
    placeholder="Search for music..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="p-2 rounded-lg border bg-white border-gray-800 text-gray-800 focus:outline-none focus:border-green-400"
   />
   <button
    type="submit"
    className="ml-2 p-2 bg-green-400 text-black rounded-lg hover:bg-green-500"
   >
    Search
   </button>
  </form>
 );
};

export default SearchBar;