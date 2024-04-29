import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../axios/AxiosService";
import AudioPlayer from "../components/AudioPlayer";

export const SongDetails = () => {
    const { songId } = useParams();
    const [item, setItem] = useState({});
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        ApiService.getSongById(songId)
          .then(response => {
            setItem(response.data);
          })
          .catch(error => {
            console.error('Error fetching song:', error);
          });
    }, [songId]);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-semibold mb-6">{item.title}</h1>
                <div className="flex items-center mb-4">
                    <span className="font-semibold mr-2">Artist:</span>
                    <span>{item.artistName}</span>
                </div>
                <div className="flex items-center mb-4">
                    <span className="font-semibold mr-2">Genre:</span>
                    <span>{item.genreName}</span>
                </div>
                {!showPlayer && (
                    <button onClick={() => setShowPlayer(true)} className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                        Play
                    </button>
                )}
                {showPlayer && (
                    <div className="mt-6">
                        <AudioPlayer
                            embedIMGLink={item.embedIMGLink}
                            title={item.title}
                            artistName={item.artistName}
                            embedLink={item.embedLink}
                        />
                    </div>
                )}
                <div className="mt-8">
                    <img src={item.embedIMGLink} alt="song cover" className="rounded-lg shadow-md" />
                </div>
            </div>
        </div>
    );
};
