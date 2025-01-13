import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setSearchResults } from '../features/searchSlice';

const SearchBar = () => {
 const [searchQuery, setSearchQuery] = useState('');
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const handleSearch = async () => {
  if (searchQuery.trim()) {
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
    console.log(response.data.items);

    dispatch(setSearchResults(response.data.items));
    navigate('/music/search?' + searchQuery);
   } catch (error) {
    console.error(error);
   }
  }
 };

 return (
  <div className="flex items-center">
   <input
    type="text"
    placeholder="Search for music..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="p-2 rounded-lg border bg-white border-gray-800 text-gray-800 focus:outline-none focus:border-green-400"
   />
   <button
    type="button"
    onClick={handleSearch}
    className="ml-2 p-2 bg-[#0DB78E] text-black rounded-lg hover:bg-green-500"
   >
    Search
   </button>
  </div>
 );
};

export default SearchBar;