import React from 'react';

const LogoutPopup = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-center mt-4">
          <button onClick={onLogout} className="mr-4 px-4 py-2 bg-[#601a56] text-white rounded hover:bg-[#601a56]">Yes</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">No</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
