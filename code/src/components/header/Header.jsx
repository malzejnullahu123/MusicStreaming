import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FaUser } from 'react-icons/fa';
import SearchBar from "../search/SearchBar";
import { useAuth } from '../../authContext/AuthContext';

const navBar = [
  { id: 1, name: "Discover", path: "/" },
  { id: 2, name: "Albums", path: "/albums" },
  { id: 3, name: "Charts", path: "/charts" },
  { id: 4, name: "Artists", path: "/artists" }
];
const navBarMobile = [
  ...navBar,
  { id: 5, name: "Login", path: "/login" }
];

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { isLoggedIn } = useAuth();

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
            {navBar.map((list, i) => (
              <li className={`mx-5 py-2 ${activeNavLink}`} key={i}>
                <NavLink to={list.path}>{list.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* profile  */}
        <div className='profile flex items-center'>
          <SearchBar />
          {isLoggedIn && (
            <Link to="/profile">
              <img
                className="w-10 h-10 rounded-full mx-3 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                src="https://picsum.photos/200/200"
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
            <ul className='flex flex-col'>
              {isLoggedIn ? (
                navBar.map((list, i) => (
                  <li className={`mx-5 py-2 ${activeNavLink}`} key={i}>
                    <NavLink to={list.path}>{list.name}</NavLink>
                  </li>
                ))
              ) : (
                navBarMobile.map((list, i) => (
                  <li className={`mx-5 py-2 ${activeNavLink}`} key={i}>
                    <NavLink to={list.path}>{list.name}</NavLink>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
