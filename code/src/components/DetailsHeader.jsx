import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = {
    name: "Artist Name",
    artwork: {
      url: "https://via.placeholder.com/500x500.png?text=Artist+Artwork",
    },
    genreNames: ["Genre 1"],
  };

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-white sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="art"
          src={artistId ? artist.artwork.url : songData?.images.coverart}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-white"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist.name : songData?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-44" />
    </div>
  );
};

export default DetailsHeader;