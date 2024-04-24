import React, { useState, useEffect } from "react";
import ApiService from '../../axios/AxiosService';
import { Card_lg } from "../common/Card_lg";
import { Title } from "../common/Title";

export const New = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    ApiService.getNewSongs(8)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <>
      <section className='hero'>
        <Title title='New' />
        <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1  gap-5'>
          {items.map((item) => (
            <div className='box card hero' key={item.songId}>
              <Card_lg
                songId = {item.songId}
                embedIMGLink={item.embedIMGLink}
                title={item.title}
                embedLink={item.embedLink} // Add anotherLink prop here
                artistName={item.artistName}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
