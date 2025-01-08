import { useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { useEffect, useState } from 'react';
import { ChevronDown, Clock, Heart, MoreHorizontal, Music, Pause, Play } from 'lucide-react';
import moment from 'moment';

const MyPlaylist = () => {
  const params = useParams();
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [expandedSong, setExpandedSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const togglePlay = (songId) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId);
  };

  const toggleLike = (songId) => {
    const newLikedSongs = new Set(likedSongs);
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  const toggleExpand = (songId) => {
    console.log(songId);

    setExpandedSong(expandedSong === songId ? null : songId);
  };
  useEffect(() => {
    const getPlaylist = async () => {
      // const res = await apiClient.get(`/playlists/${params.id}/tracks`);
      // console.log(res.data.items);
      // setPlaylist(res.data.items)
      // setCurrentlyPlaying(res.data.items[0].track);
    }
    getPlaylist();
  }, [params.id]);



  return (

    <PageContainer>
      <div className="bg-gradient-to-b from-purple-900 via-black to-black min-h-screen p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Music className="w-8 h-8 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Popular Tracks</h2>
          </div>

          {/* List Header - Only show on tablet and up */}
          <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-4 items-center px-4 py-2 text-gray-400 border-b border-gray-800 mb-2 transition-colors">
            <div className="w-8"></div>
            <div className="w-64">Title</div>
            <div className="w-40">Artist</div>
            <div className="w-40">Album</div>
            <div className="flex justify-end"><Clock className="w-5 h-5" /></div>
            <div className="w-8"></div>
          </div>

          {/* Songs List */}
          {playlist.map((song) => (
            <div key={song.track.id} className="mb-2">
              {/* Mobile View */}
              <div className="md:hidden">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-900/20 transition-colors">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => togglePlay(song.track.id)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-green-400 transition-colors"
                    >
                      {currentlyPlaying === song.track.id ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <div className="text-white font-medium">{song.track.title}</div>
                      <div className="text-gray-400 text-sm">{song.track.artists[0].name}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleLike(song.track.id)}
                      className={`p-2 ${likedSongs.has(song.track.id) ? 'text-green-400' : 'text-gray-400'}`}
                    >
                      <Heart className="w-5 h-5" fill={likedSongs.has(song.track.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => toggleExpand(song.track.id)}
                      className="p-2 text-gray-400"
                    >
                      <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedSong === song.track.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
                {/* Expanded Mobile View */}
                {expandedSong === song.track.id && (
                  <div className="px-4 py-2 bg-purple-900/10 rounded-b-lg text-sm transition-transform">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-400">Album:</span>
                      <span className="text-gray-300">{song.track.album.name}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-gray-300">{moment.utc(song.track.duration_ms).format("m:ss")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-4 items-center px-4 py-3 rounded-lg hover:bg-purple-900/20 transition-colors group">
                <button
                  onClick={() => togglePlay(song.track.id)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-green-400 transition-colors"
                >
                  {currentlyPlaying === song.track.id ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium w-64 truncate">{song.track.name}</span>
                </div>
                <div className="text-gray-400 w-40 truncate">{song.track.artists[0].name}</div>
                <div className="text-gray-400 w-40 truncate">{song.track.album.name}</div>
                <div className="text-gray-400 text-right">{moment.utc(song.track.duration_ms).format("m:ss")}</div>
                <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleLike(song.track.id)}
                    className={`hover:scale-110 transition-transform ${likedSongs.has(song.track.id) ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                      }`}
                  >
                    <Heart className="w-5 h-5" fill={likedSongs.has(song.track.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="text-gray-400 hover:text-green-400 hover:scale-110 transition-transform">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

export default MyPlaylist