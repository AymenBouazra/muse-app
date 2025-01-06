import { useEffect, useState } from 'react';
import { Music, PlayCircle } from 'lucide-react';
import axios from 'axios';
import apiClient from '../spotify';
import { Link } from 'react-router-dom';

const MusicList = () => {
  const [data, setData] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const getUserPlaylist = async () => {
    const res = await apiClient.get('me/playlists');
    setPlaylists(res.data.items);
  }
  const search = async ({ currentTarget }) => {
    const query = currentTarget.value;
    const options = {
      method: 'GET',
      url: `https://spotify23.p.rapidapi.com/search/`,
      params: {
        q: query,
        type: 'multi',
        offset: '0',
        limit: '20',
        numberOfTopResults: '5'
      },
      headers: {
        'x-rapidapi-key': 'e0edd28e50msh9cf119170b61c3ep150d6ajsn4a430688035b',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPlaylist();
  }, [])

  return (
    <div className="bg-black min-h-screen p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Music className="w-8 h-8 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Popular Tracks</h2>
        </div>

        <input type="text" placeholder='Type something...' onChange={search} className="w-full p-2 rounded-lg border border-gray-800 text-gray-400 focus-within:border-green-400 focus:outline-none" />

        {/* My Playlists */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Playlists</h1>
          <p className="text-gray-400">Browse all {playlists.length} playlists</p>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {playlists.map((playlist, index) => (
            <Link to={`/music/playlist/${playlist.id}`}
              key={index}
              className="group relative bg-purple-900/20 rounded-lg p-3 transition-all duration-300 hover:bg-purple-900/30"
            >
              {/* Image Container */}
              <div className="relative aspect-square mb-3">
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-full h-full object-cover rounded-md"
                />
                <button className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100  duration-300 bg-green-400 rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <PlayCircle className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Text Content */}
              <div className="space-y-1 d-inline-block">
                <h3 className="text-white font-medium truncate">
                  {playlist.name}
                </h3>
                <h3 className="text-gray-400 text-sm truncate">
                  {playlist.tracks.total} Tracks
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Albums */}

          {data.albums ? <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Albums</h1>
              <p className="text-gray-400">Browse all {data.albums.totalCount} albums</p>
            </div>

            {
              data.albums?.items ?
                <>
                  {/* Grid of Albums */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {data.albums.items.map((album, index) => (
                      <div
                        key={index}
                        className="group relative bg-purple-900/20 rounded-lg p-3 transition-all duration-300 hover:bg-purple-900/30"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square mb-3">
                          <img
                            src={album.data.coverArt.sources[0].url}
                            alt={album.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100  duration-300 bg-green-400 rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <PlayCircle className="w-6 h-6 text-black" />
                          </button>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-1">
                          <h3 className="text-white font-medium truncate">
                            {album.data.name}
                          </h3>
                          <h3 className="text-gray-400 text-sm truncate">
                            {album.data.artists.items[0].profile.name}
                          </h3>
                          <p className="text-green-400 text-sm truncate">
                            {album.data.date.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div></>
                : <></>
            }
          </> : <></>}

          {/* Artists */}
          {data.artists ? <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Artists</h1>
              <p className="text-gray-400">Browse all {data.artists.totalCount} artists</p>
            </div>

            {
              data.artists?.items ?
                <>
                  {/* Grid of Albums */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {data.artists.items.map((artist, index) => (
                      <div
                        key={index}
                        className="group relative bg-purple-900/20 rounded-lg p-3 transition-all duration-300 hover:bg-purple-900/30"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square mb-3">
                          {artist.data?.visuals?.avatarImage?.sources[0]?.url ? <img
                            src={artist.data?.visuals?.avatarImage?.sources[0]?.url}
                            alt={artist.data?.profile?.name}
                            className="w-full h-full object-cover rounded-md"
                          /> : <Music className="w-full h-full text-green-400 p-8" />}
                          <button className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100  duration-300 bg-green-400 rounded-full p-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <PlayCircle className="w-6 h-6 text-black" />
                          </button>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-1">
                          <h3 className="text-white font-medium truncate">
                            {artist.data.profile.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div></>
                : <></>
            }
          </> : <></>}

        </div>
      </div>
    </div>
  );
};

export default MusicList;