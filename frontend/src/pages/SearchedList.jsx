import { useSelector } from 'react-redux';
import PageContainer from '../components/PageContainer';
import Tracks from '../components/Tracks';

const SearchedList = () => {
 // Select searchResults from Redux store
 const searchResults = useSelector((state) => state.search.searchResults);


 return (
  <PageContainer>
   <Tracks videos={searchResults} />
  </PageContainer>
 );
};

export default SearchedList;