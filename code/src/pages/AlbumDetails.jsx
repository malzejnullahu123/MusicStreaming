import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../axios/AxiosService";
import { Card_sm } from "../components/common/Card_sm";

export const AlbumDetails = () => {
    const { albumId } = useParams();
    const [songs, setSongs] = useState([]);
    const [item, setItem] = useState({});
    const [data, setData] = useState({});
    const token = localStorage.getItem('token');


    useEffect(() => {
        ApiService.getAlbumById(albumId)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error fetching album:', error);
            });

        ApiService.getSongsByAlbum(albumId)
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });

        ApiService.me(token)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });

        
    }, [albumId]);





    const [formData, setFormData] = useState({
        songId: "",
        title: ""
      });
    const [showPopupp, setShowPopupp] = useState(false);

    const handleShowPopup = () => {
        setShowPopupp(true);
    };
  
    const handleCreate = async (event) => {
      event.preventDefault();
      try {
        console.log(formData.songId)
        const response = await ApiService.addSongToAlbum(albumId, formData.songId);
        setShowPopupp(false);
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
    };

    const [chosenSongs, setChosenSongs] = useState([]);


    useEffect(() => {
        ApiService.me(token)
        .then(response => {
        
            ApiService.getSongsByArtistId(response.data.userId, 1,50)
            .then(response => {
              setChosenSongs(response.data.map(song => ({ songId: song.songId, title: song.title })));
            })
            .catch(error => {
              console.error('Error fetching items:', error);
            });


        })
        .catch(error => {
            console.error('Error fetching songs:', error);
        });


      }, []);
  

    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-gray-250 to-gray-150 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-10">Album Details for "{item.title}"</h1>
                <div className="flex flex-col">
                    <p className="text-sm pb-3 pu-5">Release Date: {new Date(item.releaseDate).toLocaleDateString()}</p>
                    {data.userId === item.artistId && (
                        <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-green-600" onClick={handleShowPopup}>Add your songs</button>
                    )}

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {songs.map((song, index) => (
                    <Card_sm
                        key={index}
                        songId={song.songId}
                        embedIMGLink={song.embedIMGLink}
                        title={song.title}
                        genre={song.artistName}
                        embedLink={song.embedLink}
                        artistName={song.artistName}
                        show={true}
                        i={index}
                        className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-200"
                    />
                ))}
            </div>





        {showPopupp && (
            <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Add music to your album</h2>
                <p className="text-gray-700 mb-6 text-center">Unleash your musical flair! Craft your own playlist and let your favorite tunes take center stage.</p>
                <form className="space-y-6" onSubmit={handleCreate}>
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Choose Songs</label>
                        <select value={formData.songId} onChange={(e) => setFormData({ ...formData, songId: e.target.value })}
                            name="songId"
                            id="songId"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required >
                            <option value="">Select a song</option>
                            {chosenSongs.map((chosenSong) => (
                                <option key={chosenSong.songId} value={chosenSong.songId}>
                                {chosenSong.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    <button onClick={() => setShowPopupp(false)} className="ml-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                    </div>
                </form>
                </div>
            </div>

        )}





        </div>
    );
};
