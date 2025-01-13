import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchplaylist, removeFromPlaylist } from '../features/playlistSlice';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { MinusSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import PageContainer from '../components/PageContainer';

const MyPlaylist = () => {
  const dispatch = useDispatch();
  const { tracks } = useSelector((state) => state.playlist);
  const { playTrack, currentTrack, isPlaying } = useMusicPlayer();

  useEffect(() => {
    dispatch(fetchplaylist());
  }, [dispatch]);

  const handlePlayTrack = (video) => {
    playTrack(
      {
        videoId: video.id.videoId,
        name: video.snippet.title,
        artist: video.snippet.channelTitle,
      },
      tracks,
      'playlist'
    );
  };

  const handleRemoveTrack = (trackId) => {
    dispatch(removeFromPlaylist(trackId))
      .unwrap()
      .then(() => {
        toast.success('Removed from playlist');
      })
      .catch((error) => {
        toast.error('Failed to remove track');
        console.error(error);
      });
  };

  return (
    <PageContainer>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-4">My Playlist</h1>
        {tracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tracks.map((video) => {
              const isCurrentTrack = currentTrack?.videoId === video.id.videoId && isPlaying;

              return (
                <div
                  onClick={() => handlePlayTrack(video)}
                  key={video.id.videoId}
                  className={`relative group rounded-lg p-4 transition-all duration-300 cursor-pointer ${isCurrentTrack
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50'
                    : 'bg-gradient-to-br from-black/20 to-gray-900/20 hover:from-black/30 hover:to-gray-900/30'
                    } shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTrack(video.id.videoId);
                    }}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    title="Remove from playlist"
                  >
                    <MinusSquare className="w-4 h-4 text-red-500" />
                  </button>

                  {/* Thumbnail */}
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />

                  {/* Track Title */}
                  <h3 className="text-white font-medium text-sm sm:text-base truncate">
                    {video.snippet.title}
                  </h3>

                  {/* Channel Title */}
                  <p className="text-gray-400 text-xs sm:text-sm truncate">
                    {video.snippet.channelTitle}
                  </p>

                  {/* Play Indicator (if the track is playing) */}
                  {isCurrentTrack && (
                    <div className="absolute bottom-2 right-2 p-1 bg-black/50 rounded-full">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400">Your playlist is empty.</div>
        )}
      </div>
    </PageContainer>
  );
};

export default MyPlaylist;