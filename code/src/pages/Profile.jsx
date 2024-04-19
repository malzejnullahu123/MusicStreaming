import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { NavLink } from 'react-router-dom';
import {Playlist} from '../pages';
// import {profilePicture} from '../assets';

const Profile = () => {
    const profilePicture = '../assets/profilePicture.svg';
    const username = 'Username';
   
    
return(     
<div>  
<div className="flex items-center space-x-4">
      <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
      <div>
        <h2 className="text-lg font-semibold text-white">{username}</h2>
        <NavLink to="../playlist" className="text-sm text-white">My playlists</NavLink>
      </div>
    </div>


   
<br/><h2>Your uploads: </h2>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
    {[1, 2, 3, 4, 5].map((song, i) => (
      <SongCard key={song.key} song={song} i={i} />
    ))}
  </div>
  </div>  
 
);
}
export default Profile;
