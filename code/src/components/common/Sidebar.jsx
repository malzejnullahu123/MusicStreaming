import React, { useState, useEffect } from "react";
import { Card_sm } from "./Card_sm";
import ApiService from "../../axios/AxiosService";
import { useAuth } from '../../authContext/AuthContext';

export const Sidebar = () => {
  const [items, setItems] = useState([]);
  const { isLoggedIn } = useAuth();
  
  // const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   {isLoggedIn && (
  //     ApiService.getPlayHistory(localStorage.getItem('token'))
  //       .then(response => {
  //         setItems(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching items:', error);
  //       })
  //   )}
  // }, []);


  useEffect(() => {
    if (isLoggedIn) {
      ApiService.getPlayHistory(localStorage.getItem('token'))
        .then(response => {
          setItems(response.data);
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
    }
  }, [isLoggedIn]);

  return (
    <>
      <section className='sidebar hero'>
        <h1 className='mb-5 text-lg font-semibold text-gray-600'>Recently listened</h1>
        {items.slice(0, 5).map((item, index) => {
          return (
            <Card_sm
              key={index}
              songId={item.song.songId}
              embedIMGLink={item.song.embedIMGLink}
              title={item.song.title}
              genre={item.song.genreName}
              embedLink={item.song.embedLink}
              artistName={item.song.artistName}
              i={index}
              show={true}
            />
          );
        })}
        <p className='text-sm mt-3'>From students of Life from Gjirafa...</p>
        <span className='text-gray-500 text-[12px]'>© Copyright 2024</span>
      </section>
    </>
  );
};
