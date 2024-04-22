import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup, HiOutlineUserCircle, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { logo } from '../assets';

const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Albums', to: '/albums', icon: HiOutlinePhotograph },
  { name: 'Playlist', to: '/playlist', icon: HiOutlineUserGroup, subItems: ['Playlist 1', 'Playlist 2', 'Playlist 3'] },
  { name: 'Recently Listened', to: '/recently-listened', icon: HiOutlineHashtag },
  { name: 'My Profile', to: '/profile', icon: HiOutlineUserCircle },
];

const NavLinks = ({ handleClick, expandedPlaylist, togglePlaylist }) => (
  <div className="mt-10">
    {links.map((item) => (
      <div key={item.name}>
        <NavLink
          to={item.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-white"
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name === 'Playlist' ? (
            <div className="flex justify-between w-full" onClick={(e) => togglePlaylist(e)}>
              {item.name}
              {expandedPlaylist ? <HiOutlineMinus className="w-4 h-4 ml-auto" /> : <HiOutlinePlus className="w-4 h-4 ml-auto" />}
            </div>
          ) : (
            item.name
          )}
        </NavLink>
        {expandedPlaylist && item.name === 'Playlist' && (
          <div className="pl-6">
            {item.subItems.map((subItem, index) => (
              <NavLink
                key={index}
                to={`/playlist/${index + 1}`} // Dynamically generate playlist links
                className="flex flex-row justify-start items-center my-4 text-xs font-medium text-gray-400 hover:text-white"
                onClick={() => handleClick && handleClick()}
              >
                <div className="w-6 h-6 mr-2" />
                {subItem}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedPlaylist, setExpandedPlaylist] = useState(false);

  const togglePlaylist = (e) => {
    e.preventDefault();
    setExpandedPlaylist(!expandedPlaylist);
  };

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#9d2b86]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks expandedPlaylist={expandedPlaylist} togglePlaylist={togglePlaylist} />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks expandedPlaylist={expandedPlaylist} togglePlaylist={togglePlaylist} handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;