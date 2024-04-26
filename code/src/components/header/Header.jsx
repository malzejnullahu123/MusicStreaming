import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUser } from 'react-icons/fa';
import SearchBar from "../search/SearchBar";
import { useAuth } from '../../authContext/AuthContext';
import ApiService from "../../axios/AxiosService";

const navBar = [
  { id: 1, name: "Discover", path: "/" },
  { id: 2, name: "Albums", path: "/albums" },
  { id: 3, name: "Playlists", path: "/playlists" },
  { id: 4, name: "Artists", path: "/artists" }
];
const navBarMobile = [
  ...navBar,
  { id: 5, name: "Login", path: "/login" }
];
const navBarMobileLoggedin = [
  ...navBar,
  { id: 5, name: "Profile", path: `/profile` }
];

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [userId, setUserId] = useState();
  // const { isLoggedIn, userId } = useAuth(localStorage.getItem('userId'));
  const { isLoggedIn } = useAuth();
  const [ profilePic, setProfilePic ] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      ApiService.me(localStorage.getItem('token'))
        .then(response => {
          setUserId(response.data.userId);
          setProfilePic(response.data.embedImgLink)
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }
  }, [isLoggedIn]);

  const activeNavLink = ({ isActive }) => (isActive ? "active" : "NavLink");

  return (
    <header className='fixed top-0 left-0 z-50 w-screen h-[8vh] md:shadow-md shadow-sm bg-white'>
      {/* desktop and tablet */}
      <div className='hidden md:flex justify-between px-7 p-2'>
        {/* logo */}
        <div className='logo flex'>
          <div>
            <Link to="/">
              <img src={logo} alt='logo' width='40px' height='40px' />
            </Link>
          </div>
          <Link to="/">
            <h2 className='text-2xl font-semibold ml-3'>BeatFlow</h2>
          </Link>
        </div>

        {/* navlinks  */}
        <div className='menu'>
          <ul className='flex'>
            {/* {navBar.map((list, i) => (
              <li className={`mx-5 py-2 ${activeNavLink}`} key={i}>
                <NavLink  to={list.path}>{list.name}</NavLink>
                
              </li>
            ))} */}
            <li className={`mx-5 py-2 ${activeNavLink}`}>
              <NavLink className="mx-5 py-2" to={"/"}>Discover</NavLink>
              <NavLink className="mx-5 py-2" to={"/Albums"}>Albums</NavLink>
              <NavLink className="mx-5 py-2" to={"/Playlists"}>Playlists</NavLink>
              <NavLink className="mx-5 py-2" to={"/Artists"}>Artists</NavLink>
            </li>
          </ul>
        </div>

        {/* profile  */}
        <div className='profile flex items-center'>
          <SearchBar />
          {isLoggedIn && (
            <Link to={`/profile/${userId}`}>
              <img
                className="w-10 h-10 rounded-full mx-3 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                src={profilePic}
                alt="Profile"
              />
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login">
              <button className="bg-primary px-6 py-2 text-white rounded-full flex items-center gap-1 mx-3 hover:bg-primary-dark hover:text-gray-300 focus:outline-none">
                <FaUser />
                Log in
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* mobile */}
      <div className='flex items-center justify-between md:hidden h-full pl-2 pr-8'>
        {/* logo */}
        <Link to={"/"} className='flex items-center gap-2'>
          <div className='logo flex'>
            <div>
              <img src={logo} alt='logo' width='40px' height='40px' />
            </div>
            <h2 className='text-2xl font-semibold ml-3'>BeatFlow</h2>
          </div>
        </Link>

        <div className="flex items-center">
          <SearchBar />
          <AiOutlineMenu size={20} onClick={() => setIsMenu(!isMenu)} />
        </div>

        {isMenu && (
          <div className='bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-16 left-0 w-full '>
              {isLoggedIn ? (
                  <ul className='flex flex-col'>
                    <li className={`mx-5 py-2 ${activeNavLink}`}>
                      <NavLink to={"/"} onClick={() => setIsMenu(!isMenu)}>Discover</NavLink></li>
                    <li className={`mx-5 py-2  ${activeNavLink}`}>
                      <NavLink to={"/Albums"} onClick={() => setIsMenu(!isMenu)}>Albums</NavLink></li>
                    <li className={`mx-5 py-2  ${activeNavLink}`}>
                      <NavLink to={"/Playlists"} onClick={() => setIsMenu(!isMenu)}>Playlists</NavLink></li>
                    <li className={`mx-5 py-2  ${activeNavLink}`}>
                      <NavLink to={"/Artists"} onClick={() => setIsMenu(!isMenu)}>Artists</NavLink></li>
                    <li className={`mx-5 py-2  ${activeNavLink}`}>
                      <NavLink to={`/profile/${userId}`} onClick={() => setIsMenu(!isMenu)}>Profile</NavLink></li>
                  </ul>

                // ))
              ) : (
                navBarMobile.map((list, i) => (
                  <li className={`mx-5 py-2 ${activeNavLink}`} key={i}>
                    <NavLink to={list.path} onClick={() => setIsMenu(!isMenu)}>{list.name}</NavLink>
                  </li>
                ))
              )}
          </div>
        )}

      </div>
    </header>
  );
};
