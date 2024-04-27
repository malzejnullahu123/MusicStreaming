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
  const [role, setRole] = useState([localStorage.getItem('userRole')]);
  const [followerCounts, setFollowerCounts] = useState({ followerCount: 0, followingCount: 0 });
  const [myProfile, setMyProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [following, setFollowing] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const [formData, setFormData] = useState({
    name: "",
    embedImgLink: ""
  });

  //////////////////////////////

  // const saveRoleToLocalStorage = (role) => {
  //   localStorage.setItem('userRole', role);
  // };

  useEffect(() => {
    // if (userId == response.data.userId) {
    //       setMyProfile(true);
    //     } else {
    //       ApiService.checkIfIsFollowing(userId)
    //         .then(response => {
    //           setFollowing(response.data);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching user information:', error);
    //         });
    //     }
    ApiService.me(localStorage.getItem('token'))
      .then(response => {
        // saveRoleToLocalStorage(response.data.role)
        if (userId == response.data.userId) {
          setMyProfile(true);
        } else {
          ApiService.checkIfIsFollowing(userId)
            .then(response => {
              setFollowing(response.data);
            })
            .catch(error => {
              console.error('Error fetching user information:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });

    ApiService.getUserById(userId)
      .then(response => {
        setProfileInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });

    ApiService.getNrFollow(userId)
      .then(response => {
        setFollowerCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching follower counts:', error);
      });
  }, [userId, following]);

  const handleSignOut = () => {
    removeToken();
    logout();
    setRedirect(true);
  };

  const handleFollow = () => {
    if (following) {
      ApiService.unfollowUser(userId)
        .then(response => {
          setFollowing(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      ApiService.followUser(userId)
        .then(response => {
          setFollowing(true);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleBecomeArtistClick = () => {
    setShowPopup(true); // Open the popup
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation and processing here
    ApiService.registerAsArtist(formData)
        .then(response => {
          setShowPopup(false);
          setRole('artist')
          localStorage.setItem('userRole', 'artist');
          console.log("resigtered as artist succesfully")
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setShowPopup(false);
        });
   };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-4xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <img src={profileInfo.embedImgLink} alt="Profile" className="rounded-full h-16 w-16 mr-4" />
            <div>
              <h1 className="text-2xl font-semibold">{profileInfo.fullName}</h1>
              {role != "artist" && (
                <p className="text-gray-500 text-lg">Music lover</p>
              )}
              {role == "artist" && (
                <p className="text-gray-500 text-lg">Artist</p>
              )}
              <div className="flex text-gray-500 text-sm">
                <span className="mr-4">{followerCounts.followerCount} Followers</span>
                <span>{followerCounts.followingCount} Following</span>
              </div>
            </div>
          </div>
            <div className="flex items-center space-x-4">
              {myProfile && role != "artist" && (
                <button onClick={handleBecomeArtistClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Become an Artist</button>
              )}
              {myProfile && (
                <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Sign Out</button>
              )}
              {!myProfile && (
                <button onClick={handleFollow} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  {following ? "Following" : "Follow"}
                </button>
              )}
            </div>
          </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold">My Playlists</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {/* {playlists.map(playlist => (
              <div key={playlist.id} className="bg-gray-200 p-6 rounded-lg flex flex-col justify-between" style={{ backgroundImage: `url("${playlist.imageUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}>
                <p className="text-lg font-semibold text-center">{playlist.name}</p>
              </div>
            ))} */}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold">{profileInfo.fullName}'s uploads:</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="rounded-lg" />
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="rounded-lg" />
            <img src="https://via.placeholder.com/150" alt="Placeholder" className="rounded-lg" />
          </div>
        </div>
      </div>


      {/* popup */}
      {showPopup && (
 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-8 rounded-lg max-w-md shadow-lg"> {/* Added shadow for depth */}
      <h2 className="text-2xl font-bold mb-4 text-center">Become an Artist</h2> {/* Increased font size and bold for emphasis */}
      <p className="text-gray-700 mb-6 text-center">Join the community of artists and start sharing your music with the world.</p> {/* Centered text and increased margin for better spacing */}
      <form className="space-y-6" onSubmit={handleSubmit}> {/* Increased space between form elements */}
        <div>
          <label htmlFor="artistName" className="block text-sm font-medium text-gray-700">Artist Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="artistName" id="artistName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="url" value={formData.embedImgLink} onChange={(e) => setFormData({ ...formData, embedImgLink: e.target.value })} name="imageUrl" id="imageUrl" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
        </div>
        <div className="flex justify-center"> {/* Centered buttons for a cleaner look */}
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button> {/* Enhanced button styling */}
          <button onClick={() => setShowPopup(false)} className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button> {/* Enhanced button styling */}
        </div>
      </form>
    </div>
 </div>
)}



    </div>
  );
};
