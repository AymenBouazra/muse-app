import { useContext } from 'react';
import { PlayerContext } from '../utils/context';
import PageContainer from '../components/PageContainer';
import Tracks from '../components/Tracks';

const MusicList = () => {
  const { videos } = useContext(PlayerContext);

  return (
    <PageContainer>
      <div className="space-y-2 pb-16">
        <Tracks videos={videos} />
      </div>
    </PageContainer>
  );
};

export default MusicList;