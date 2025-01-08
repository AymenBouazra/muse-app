// import { loginEndpoint } from '../../spotify'
import { loginEndpoint } from '../../lastfm'
import PageContainer from '../../components/PageContainer'
import spotify from '/assets/img/spotify.png'
const Login = () => {
 return (
  <PageContainer>
   <div className='flex justify-center items-center h-screen'>
    <div className='w-1/2 flex flex-col items-center justify-center'>
     <img src={spotify} alt='login' className='w-1/4 mb-8' />
     {/* <a href={loginEndpoint} className='bg-white text-black p-2 rounded-lg'>
      Login with Spotify
     </a> */}

     <a href={loginEndpoint} className='bg-white text-black p-2 rounded-lg'>
      Login with LastFm
     </a>
    </div>
   </div>
  </PageContainer>

 )
}

export default Login