import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import { removeToken } from '../axios/AxiosService';
import ApiService from "../axios/AxiosService";

export const Profile = () => {
  const { userId } = useParams();
  const { isLoggedIn, logout } = useAuth();
  const [redirect, setRedirect] = useState(false);
  const [item, setItem] = useState([]);
  const [followerCounts, setFollowerCounts] = useState({ followerCount: 0, followingCount: 0 });

  useEffect(() => {
    ApiService.me(localStorage.getItem('token'))
      .then(response => {
        setItem(response.data);
        console.log(item.fullName)
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
      ApiService.getNrFollow()
      .then(response => {
        setFollowerCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching follower counts:', error);
      });
  }, []);

  

  const handleSignOut = () => {
    removeToken();
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-4xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full h-16 w-16 mr-4" />
            <div>
              <h1 className="text-2xl font-semibold">{item.fullName}</h1>
              <p className="text-gray-500 text-lg">Music lover</p>
              <div className="flex text-gray-500 text-sm">
                <span className="mr-4">{followerCounts.followerCount} Followers</span>
                <span>{followerCounts.followingCount} Following</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Become an Artist</button>
            <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Sign Out</button>
          </div>        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold">John Doe's uploads:</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="rounded-lg" />
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="rounded-lg" />
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="rounded-lg" />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold">My Playlists</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-200 p-6 rounded-lg flex flex-col justify-between" style={{ backgroundImage: 'url("https://via.placeholder.com/150")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}>
              <p className="text-lg font-semibold text-center">Playlist 1</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg flex flex-col justify-between" style={{ backgroundImage: 'url("https://via.placeholder.com/150")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}>
              <p className="text-lg font-semibold text-center">Playlist 2</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg flex flex-col justify-between" style={{ backgroundImage: 'url("https://via.placeholder.com/150")', backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}>
              <p className="text-lg font-semibold text-center">Playlist 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
