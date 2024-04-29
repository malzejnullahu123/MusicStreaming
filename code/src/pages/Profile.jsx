import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import { removeToken } from '../axios/AxiosService';
import ApiService from "../axios/AxiosService";
import { CardPlaylist } from "../components/common/Card_Playlist";
import { Card_lg } from "../components/common/Card_lg";


export const Profile = () => {
  const { userId } = useParams();
  const { isLoggedIn, logout } = useAuth();
  const [redirect, setRedirect] = useState(false);
  // const [role, setRole] = useState([localStorage.getItem('userRole')]);
  const [role, setRole] = useState([]);
  const [followerCounts, setFollowerCounts] = useState({ followerCount: 0, followingCount: 0 });
  const [myProfile, setMyProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [following, setFollowing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupUpload, setShowPopupUpload] = useState(false);
  const [songs, setSongs] = useState([]);



  const [formData, setFormData] = useState({
    name: "",
    embedImgLink: ""
  });

  const [page, setPage] = useState(1);
  const [playlists, setPlaylists] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPlaylists();
  }, [page]);

  const fetchPlaylists = async () => {
    try {
      console.log(userId)
      const response = await ApiService.getPlaylistByUserId(userId, page, 3);
      if (response.data.length === 0) {
        setHasMore(false); // No more results available
      } else {
        setPlaylists((prevPlaylists) => {
          const newPlaylists = response.data.filter(
            (playlist) => !prevPlaylists.find((prevPlaylist) => prevPlaylist.playlistId === playlist.playlistId)
          );
          return [...prevPlaylists, ...newPlaylists];
        });
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };


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
          setRole(response.data.role)
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


      // ApiService.getPlaylistsOfUser(userId, pageNumber, pageSize)
      // .then(response => {
      //   setPlaylists(response.data);
      // })
      // .catch(error => {
      //   console.error('Error fetching items:', error);
      // });


      ApiService.getSongsByArtist(userId,1,10)
      .then(response => {
        setSongs(response.data);
        console.log(response.data.title)
      })
      .catch(error => {
        console.error('Error fetching Songs from artist:', error);
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
          // setRole('artist')
          // localStorage.setItem('userRole', 'artist');
          console.log("resigtered as artist succesfully")
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setShowPopup(false);
        });

   };
   const [formDataa, setFormDataa] = useState({
    title: '',
    artistId: userId,
    genreId: '',
    embedLink: '',
    embedIMGLink: ''
  });

   const handleUpload = () => {
    setShowPopupUpload(true)
   };
   const handleUploadSubmit = (event) => {
    console.log(formDataa)
    ///////
    event.preventDefault();
    // Perform validation and processing here
    ApiService.addSong(formDataa)
        .then(response => {
          setShowPopupUpload(false);
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setShowPopupUpload(false);
        });
   };
   const addNewGenre = async (newGenre) => {
    try {
      const response = await ApiService.addNewGenre({
        name: newGenre
      });
      const genreId = response.data.genreId;
      setGenres([...genres, { id: genreId, name: newGenre }]);
    } catch (error) {
      console.error('Error adding new genre:', error);
    }
  };


  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await ApiService.getGenres();
        // Assuming response.data is an array of genre objects
        setGenres(response.data.map(genre => ({ id: genre.genreId, name: genre.name })));
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);


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
          <div className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {myProfile && role != "artist" && (
                <button onClick={handleBecomeArtistClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Become an Artist</button>
              )}
              {myProfile && role == "artist" && (
                <button onClick={handleUpload} className="bg-primary px-6 py-2 text-white rounded-lg flex items-center gap-1 mx-3 hover:bg-green-600">Upload Music</button>
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
        {(following || myProfile) &&
          <div className="p-6">
          <h2 className="text-lg font-semibold">My Playlists</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {playlists.map((playlist, i) => (
              <CardPlaylist
                key={i}
                playlistId={playlist.playlistId}
                name={playlist.name}
                user_name={playlist.userId}
                image={playlist.image}
                visibility={playlist.isVisible}
              />
            ))}
          </div>
          {hasMore && (
          <div className="mt-5 text-center">
            <button onClick={handleShowMore} className="bg-primary text-white px-4 py-2 rounded-full">
              Show More
            </button>
          </div>
          )}
        </div>
        }

      {(role == "artist" || following ) &&(
        <div className="p-6">
          <h2 className="text-lg font-semibold">{profileInfo.fullName}'s uploads:</h2>



          {/* //////////// cards of upload */}

          <section className='hero'>
        <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1  gap-5'>
          {songs.map((song) => (
            <div className='box card hero' key={song.songId}>
              <Card_lg
                songId = {song.songId}
                embedIMGLink={song.embedIMGLink}
                title={song.title}
                embedLink={song.embedLink} // Add anotherLink prop here
                artistName={song.artistName}
              />
            </div>
          ))}
        </div>
      </section>


        </div>
        )}
        
      </div>















      {/* //popup to become an artist */}
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



      {/* popup to upload music */}
      {showPopupUpload && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Music</h2> 
            <p className="text-gray-700 mb-6 text-center">Share your melodies with the world and let your music shine.</p>
   

            {/* //// */}
            <form className="space-y-6" onSubmit={handleUploadSubmit}>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formDataa.title}
                    onChange={(e) => setFormDataa({ ...formDataa, title: e.target.value })}
                    name="title"
                    id="title"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                <label htmlFor="genreId" className="block text-sm font-medium text-gray-700">Genre</label>
                <div className="flex items-center">

                <select
                  value={formDataa.genreId}
                  onChange={(e) => setFormDataa({ ...formDataa, genreId: e.target.value })}
                  name="genreId"
                  id="genreId"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
                  <button type="button"
                    onClick={async () => {
                      const newGenre = prompt('Enter a new genre:');
                      if (newGenre) {
                        const genreId = await addNewGenre(newGenre);
                        if (genreId) {
                          setFormDataa({ ...formDataa, genreId: genreId });
                        }
                      }
                    }} className="ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Genre
                  </button>
                </div>
              </div>
                <div>
                  <label htmlFor="embedLink" className="block text-sm font-medium text-gray-700">Embed Link</label>
                  <input
                    type="url"
                    value={formDataa.embedLink}
                    onChange={(e) => setFormDataa({ ...formDataa, embedLink: e.target.value })}
                    name="embedLink"
                    id="embedLink"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="embedIMGLink" className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    value={formDataa.embedIMGLink}
                    onChange={(e) => setFormDataa({ ...formDataa, embedIMGLink: e.target.value })}
                    name="embedIMGLink"
                    id="embedIMGLink"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                  <button onClick={() => setShowPopupUpload(false)} className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                </div>
              </form>



          </div>
      </div>
      )}
    </div>
  );
};
