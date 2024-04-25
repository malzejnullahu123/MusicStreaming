import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Title } from '../common/Title';
import { Card_lg } from '../common/Card_lg';
import ApiService from '../../axios/AxiosService';

export const SearchComp = () => {
  const { query } = useParams();
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songPage, setSongPage] = useState(1);
  const [artistPage, setArtistPage] = useState(1);

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
    } else {
      setSongs([]);
      setArtists([]);
    }
  }, [query, songPage, artistPage]);

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
    </>
  );
   
};