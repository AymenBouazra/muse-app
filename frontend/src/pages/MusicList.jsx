import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from '../features/playerSlice';
import PageContainer from '../components/PageContainer';
import Tracks from '../components/Tracks';
import axios from 'axios';
import { useMusicPlayer } from '../hooks/useMusicPlayer';

const MusicList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.player.videos);
  const { playTrack } = useMusicPlayer();

  useEffect(() => {
    const fetchVideos = async () => {
      const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
          relatedToVideoId: '7ghhRHRP6t4',
          part: 'id,snippet',
          type: 'video',
          maxResults: 8,
        },
        headers: {
          'x-rapidapi-key': 'e0edd28e50msh9cf119170b61c3ep150d6ajsn4a430688035b',
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        dispatch(setVideos(response.data.items))
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, [dispatch]);

  return (
    <PageContainer>
      <div className="space-y-2 pb-16">
        <Tracks videos={videos} playTrack={playTrack} />
      </div>
    </PageContainer>
  );
};

export default MusicList;