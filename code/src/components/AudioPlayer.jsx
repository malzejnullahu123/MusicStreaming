import React, { useState } from "react";

const AudioPlayer = ({ embedIMGLink, title, artistName, embedLink }) => {
  const [isPlaying, setPlaying] = useState(false);

  // useEffect(() => {
  //   const audio = document.getElementById("audio");
  //   audio.addEventListener("ended", onEnded);
  //   return () => {
  //     audio.removeEventListener("ended", onEnded);
  //   };
  // }, [onEnded]);

  // const handlePlayClick = () => {
  //   const audio = document.getElementById("audio");
  //   if (audio.src !== embedLink) {
  //     audio.src = embedLink;
  //   }
  //   setPlaying(!isPlaying);
  // };

  // const handleEnded = () => {
  //   setPlaying(false);
  // };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 text-white p-4 flex items-center justify-center"
      style={{
        zIndex: 9999,
        backdropFilter: "blur(10px)",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="flex items-center w-full">
        <img
          src={embedIMGLink}
          alt="Song cover"
          className="w-16 h-16 mr-4 object-cover rounded-md hidden md:block"
        />
        <div className="mb-5 flex-1 relative">
          <div className="ml-6">
            <div className="flex items-center">
              <h3 className="text-lg text-black font-semibold mb-1 mr-4" style={{ textShadow: "0 0 5px white" }}>{title}</h3>
              <p className="text-sm text-black" style={{ textShadow: "0 0 5px white" }}>{artistName}</p>
            </div>
          </div>
          <audio id="audio" controls autoPlay src={embedLink} className="w-full ml-4">
            Your browser does not support the audio element.
          </audio>
          {/* <div className="mt-2">
            <button onClick={handlePlayClick}>{isPlaying ? "Pause" : "Play"}</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
