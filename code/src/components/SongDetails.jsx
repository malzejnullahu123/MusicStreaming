import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

// Replace this with your PostgreSQL data fetching logic
const useGetSongDetailsQuery = (songid) => {
  const songData = {}; // Placeholder for static data or data fetching from PostgreSQL
  return { data: songData, isFetching: false };
};

// Replace this with your PostgreSQL data fetching logic
const useGetSongRelatedQuery = (songid) => {
  const data = []; // Placeholder for static data or data fetching from PostgreSQL
  return { data, isFetching: false, error: null };
};

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery(songid);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
        {songData?.sections?.[1]?.type === "LYRICS" ? (
          songData?.sections?.[1]?.text?.map((Line, i) => (
            <p key={i} className="text-gray-400 text-base my-1">
              {Line}
            </p>
          ))
        ) : (
          <p>Sorry, no lyrics found!</p>
        )}
        <div className="mt-5" />
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;