import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Title } from '../common/Title';
import { Card_lg } from '../common/Card_lg';
import ApiService from '../../axios/AxiosService';
import {CardPlaylist} from '../common/Card_Playlist'

export const SearchComp = () => {
  const { query } = useParams();
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [users, setUsers] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [songPage, setSongPage] = useState(1);
  const [artistPage, setArtistPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [playlistPage, setPlaylistPage] = useState(1);


  useEffect(() => {
    if (query) {
      ApiService.searchSongs(query, songPage, 4)
        .then(response => {
          setSongs(response.data.length > 0 ? response.data : []);
        })
        .catch(error => {
          console.error('Error fetching songs:', error);
          setSongs([]);
        });
  
        ApiService.searchArtists(query, artistPage, 4)
        .then(response => {
          setArtists(response.data.length > 0 ? response.data : []);
        })
        .catch(error => {
          console.error('Error fetching artists:', error);
          setArtists([]);
        });
        ApiService.searchUsers(query, userPage, 4)
        .then(response => {
          setUsers(response.data.length > 0 ? response.data : []);
          console.log(response.data)

        })
        .catch(error => {
          console.error('Error fetching users:', error);
          setUsers([]);
        });
        ApiService.searchPlaylists(query, playlistPage, 4)
        .then(response => {
          setPlaylists(response.data.length > 0 ? response.data : []);
        })
        .catch(error => {
          console.error('Error fetching playlists:', error);
          setPlaylists([]);
        });
    } else {
      setSongs([]);
      setArtists([]);
      setUsers([]);
      setPlaylists([]);
    }
  }, [query, songPage, artistPage, userPage, playlistPage]);

  const handleSongSeeMore = () => {
    setSongPage(songPage + 1);
  };
  

  const handleSongSeeLess = () => {
    setSongPage(songPage - 1);
  };

  const handleArtistSeeMore = () => {
    setArtistPage(artistPage + 1);
  };

  const handleArtistSeeLess = () => {
    setArtistPage(artistPage - 1);
  };

  const handleUserSeeMore = () => {
    setUserPage(userPage + 1);
  };

  const handleUserSeeLess = () => {
    setUserPage(userPage - 1);
  };

  const handlePlaylistSeeMore = () => {
    setPlaylistPage(playlistPage + 1);
  };

  const handlePlaylistSeeLess = () => {
    setPlaylistPage(playlistPage - 1);
  };

  return (
    <>
      <section className='hero'>
        <div className='container mx-auto p-4 bg-blue-100 rounded-lg shadow-lg relative'>
          <Title title='Search for songs:' />
          {songs.length === 0 && (
            <p className="text-center">No Results found for "{query}"</p>
          )}
          <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1 gap-5'>
            {songs.map((item, index) => (
              <div className='box card hero' key={index}>
                <Card_lg
                  embedIMGLink={item.embedIMGLink}
                  title={item.title}
                  embedLink={item.embedLink}
                  artistName={item.artistName}
                />
              </div>
            ))}
          </div>
  
          <div className='flex justify-center mt-5'>
            {songPage > 1 && (
              <button onClick={handleSongSeeLess} className='bg-primary text-white px-4 py-2 rounded-md mr-4'>
                See less
              </button>
            )}
            {songs.length === 4 && (
              <button onClick={handleSongSeeMore} className='bg-primary text-white px-4 py-2 rounded-md'>
                See more
              </button>
            )}
          </div>
  
          <div className="absolute bottom-4 right-4">
            <span className="text-sm text-gray-500">
              Page {songPage}
            </span>
          </div>
        </div>
      </section>
  
      {/* artistSection now */}
  
      <section className='hero'>
        <div className='container mx-auto p-4 bg-green-100 rounded-lg shadow-lg relative'>
          <Title title='Search for artists:' />
          {artists.length === 0 && (
            <p className="text-center">No Results found for "{query}"</p>
          )}
          <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1 gap-5'>
            {artists.map((artist, i) => (
              <Link to={`/artist/${artist.artistId}`} key={artist.artistId}>
                <div className='box card text-center'>
                  <div className='img relative h-52 w-52 m-auto'>
                    <img src={artist.embedImgLink} alt='cover' className='w-full h-full object-cover rounded-full' />
                  </div>
                  <div className='text-center'>
                    <h3 className='text-md text-gray-500 font-semibold'>{artist.name}</h3>
                    <span className='text-gray-400'>aa</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='flex justify-center mt-5'>
            {artistPage > 1 && (
              <button onClick={handleArtistSeeLess} className='bg-primary text-white px-4 py-2 rounded-md mr-4'>
                See less
              </button>
            )}
            {artists.length === 4 && (
              <button onClick={handleArtistSeeMore} className='bg-primary text-white px-4 py-2 rounded-md'>
                See more
              </button>
            )}
          </div>
  
          <div className="absolute bottom-4 right-4">
            <span className="text-sm text-gray-500">
              Page {artistPage}
            </span>
          </div>
        </div>
      </section>


      {/* userSection now */}
  
      <section className='hero'>
        <div className='container mx-auto p-4 bg-red-100 rounded-lg shadow-lg relative'>
          <Title title='Search for Users:' />
          {users.length === 0 && (
            <p className="text-center">No Results found for "{query}"</p>
          )}
          <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1 gap-5'>
            {users.map((user, i) => (
              <Link to={`/profile/${user.userId}`} key={user.userId}>
                <div className='box card text-center'>
                  <div className='img relative h-52 w-52 m-auto'>
                    <img src={user.embedImgLink} alt='cover' className='w-full h-full object-cover rounded-full' />
                  </div>
                  <div className='text-center'>
                    <h3 className='text-md text-gray-500 font-semibold'>{user.fullName}</h3>
                    <span className='text-gray-400'>{user.role}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='flex justify-center mt-5'>
            {userPage > 1 && (
              <button onClick={handleUserSeeLess} className='bg-primary text-white px-4 py-2 rounded-md mr-4'>
                See less
              </button>
            )}
            {users.length === 4 && (
              <button onClick={handleUserSeeMore} className='bg-primary text-white px-4 py-2 rounded-md'>
                See more
              </button>
            )}
          </div>
  
          <div className="absolute bottom-4 right-4">
            <span className="text-sm text-gray-500">
              Page {userPage}
            </span>
          </div>
        </div>
      </section>



      {/* playlistat */}

      <section className='hero'>
        <div className='container mx-auto p-4 bg-yellow-100 rounded-lg shadow-lg relative'>
          <Title title='Search for playlists:' />
          {playlists.length === 0 && (
            <p className="text-center">No Results found for "{query}"</p>
          )}
          <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1 gap-5'>
            {playlists.map((item, index) => (
              <div className='box card hero' key={index}>
                <CardPlaylist
                  key={index}
                  playlistId={item.playlistId}
                  name={item.name}
                  user_name={item.userId}
                  image={item.image}
                  visibility={item.isVisible}
                />
              </div>
            ))}
          </div>
  
          <div className='flex justify-center mt-5'>
            {playlistPage > 1 && (
              <button onClick={handlePlaylistSeeLess} className='bg-primary text-white px-4 py-2 rounded-md mr-4'>
                See less
              </button>
            )}
            {playlists.length === 4 && (
              <button onClick={handlePlaylistSeeMore} className='bg-primary text-white px-4 py-2 rounded-md'>
                See more
              </button>
            )}
          </div>
  
          <div className="absolute bottom-4 right-4">
            <span className="text-sm text-gray-500">
              Page {playlistPage}
            </span>
          </div>
        </div>
      </section>
    </>
  );
   
};