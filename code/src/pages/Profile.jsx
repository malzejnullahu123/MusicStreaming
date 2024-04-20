import { Error, Loader, SongCard, NewUploadPopup, LogoutPopup } from '../components';
import { genres } from '../assets/constants';
import { NavLink } from 'react-router-dom';
// import {Playlist} from '../pages';
// import {profilePicture} from '../assets';
import { FiLogOut, FiUpload } from 'react-icons/fi';


import React, { useState } from 'react';



const Profile = () => {
    const profilePicture = '../assets/profilePicture.svg';
    const username = 'Username';
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [showNewUploadPopup, setShowNewUploadPopup] = useState(false);
    const handleLogout = () => {
      // Perform logout logic here
      console.log('Logging out...');
      setShowLogoutPopup(false);
    }
    const toggleLogoutPopup = () => {
      setShowLogoutPopup(!showLogoutPopup);
      console.log('Toggle logout popup');
    };
    const toggleNewUploadPopup = () => {
      setShowNewUploadPopup(!showNewUploadPopup);
    };
    
  
    const color =" [#601a56]";
return(     
<div>  
<div className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md flex items-center justify-between">
   <div className="flex items-center space-x-4">
    <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />
      <div>
         <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
            <NavLink to="../playlist" className="text-sm text-gray-600">My playlists</NavLink>
   </div>
   </div>
   <button className="flex items-center ml-auto">
   <FiLogOut className="text-gray-600 w-6 h-6 cursor-pointer" onClick={toggleLogoutPopup} />

   </button>
   </div>  
<br/>
        <div className="border border-gray-300 p-4 rounded-lg">
<h2>Your uploads: </h2>
<button className="flex items-center ml-auto" onClick={toggleNewUploadPopup}>
                <FiUpload className="text-white w-6 h-6 cursor-pointer" /> 
                <p className="text-sm text-white ml-2">New Upload</p> 
            </button>
            <br/>
    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
    {[1, 2, 3, 4, 5].map((song, i) => (
      <SongCard key={song.key} song={song} i={i} />
    ))}
  </div>
 
  </div>  
  <LogoutPopup isOpen={showLogoutPopup} onClose={toggleLogoutPopup} onLogout={handleLogout} />
  <NewUploadPopup isOpen={showNewUploadPopup} onClose={toggleNewUploadPopup} />
  </div>
 
);
}
export default Profile;
