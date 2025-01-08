import { useContext } from 'react';
import { PlayerContext } from '../utils/context';
import PageContainer from '../components/PageContainer';
import Tracks from '../components/Tracks';

const SearchedList = () => {
 const { searchResults } = useContext(PlayerContext);

 return (
  <PageContainer>
   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 px-10">
    <Tracks videos={searchResults} />
   </div>

  </PageContainer>
 );
};

export default SearchedList;