import SongBar from "./SongBar";

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => (
  <div className="flex flex-col ">
    <h1 className="font-bold text-3xl text-white">Related Songs: </h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

const useGetRelatedSongsQuery = (artistId) => {
  const data = [
    {
      key: "1",
      title: "Related Song 1",
      artist: "Artist 1",
      album: "Album 1",
      duration: "3:45",
      thumbnail: "https://via.placeholder.com/140x140.png?text=Song+1",
    },
    {
      key: "2",
      title: "Related Song 2",
      artist: "Artist 2",
      album: "Album 2",
      duration: "4:15",
      thumbnail: "https://via.placeholder.com/140x140.png?text=Song+2",
    },
  ];
  return { data, isFetching: false, error: null };
};


const EnhancedRelatedSongs = ({ isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
  const { data, isFetching, error } = useGetRelatedSongsQuery(artistId);

  if (isFetching) return <Loader title="Fetching related songs" />;
  if (error) return <Error />;

  return <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} artistId={artistId} />;
};

export default EnhancedRelatedSongs;