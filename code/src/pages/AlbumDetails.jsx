import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../axios/AxiosService";
import { Card_sm } from "../components/common/Card_sm";

export const AlbumDetails = () => {
    const { albumId } = useParams();
    const [songs, setSongs] = useState([]);
    const [item, setItem] = useState({});

    useEffect(() => {
        ApiService.getAlbumById(albumId)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, [albumId]);

    useEffect(() => {
        ApiService.getSongsByAlbum(albumId)
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }, [albumId]);

    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-gray-250 to-gray-150 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Album Details for "{item.title}"</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
        </div>
    );
};
