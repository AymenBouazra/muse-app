import '../assets/css/player.css'
import AudioPlayer from 'react-h5-audio-player';

const Player = (props) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
    <AudioPlayer
      src={'https://open.spotify.com/embed/track/1Es7AUAhQvapIcoh3qMKDL'}
      controls
      // header={props.currentTrack.name}
      // footer={props.currentTrack.artists[0].name}
      autoPlay
      loop
      showPlaylist
      showLyrics
      className='bg-black backdrop-blur-sm'
    />
  </div>
);

export default Player