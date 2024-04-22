import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowPopup = ({ isOpen, onClose, userId }) => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      axios.get(`http://localhost:5432/users/${userId}/followers`)
        .then(response => {
          setFollowers(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setError('Error fetching followers. Please try again.');
          setIsLoading(false);
        });
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Followers</h2>
        {isLoading ? (
          <p>Loading followers...</p>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}
            {followers.length === 0 ? (
              <p>No followers found.</p>
            ) : (
              <ul>
                {followers.map(follower => (
                  <li key={follower.id}>{follower.username}</li>
                ))}
              </ul>
            )}
          </>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Close</button>
      </div>
    </div>
  );
}

export default FollowPopup;
