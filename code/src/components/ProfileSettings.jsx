import React, { useState } from 'react';

const ProfileSettings = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfilePicture(reader.result);
    };

    reader.readAsDataURL(file);
  };



  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
        <div className="mb-4">
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" className="border border-gray-300 rounded-md px-2 py-1" />
        </div>
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleProfilePictureChange} className="border border-gray-300 rounded-md px-2 py-1" />
        </div>
        {profilePicture && (
          <div className="mb-4">
            <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full" />
          </div>
        )}
       
        <div className="flex justify-center">
          <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-[#601a56] text-white rounded hover:bg-[#601a56]">Save</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
