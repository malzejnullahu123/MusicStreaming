import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Searchbar, Sidebar, TopPlay, Login, Signup } from './components';
import { Discover, Search, RecentlyListened, Playlist, Playlist1, Playlist2, Albums, Profile } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" style={{ zIndex: '99999999999999999999999999' }} />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gradient-to-br from-[#d04cbe] to-[#810769]">
          <Searchbar />

          {/* <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse"> */}
          <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
    <div className="flex-1 h-full">
             
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/playlist/1" element={<Playlist1 />} />
                    <Route path="/playlist/2" element={<Playlist2 />} />
                    {/* <Route path="/playlist/3" element={<Playlist3 />} /> */}
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/playlist" element={<Playlist />} />
                    <Route path="/recently-listened" element={<RecentlyListened />} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search/:searchTerm" element={<Search />} />
                  </Routes>
              
            </div>

            {activeSong?.title && (
              <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
                <MusicPlayer />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
