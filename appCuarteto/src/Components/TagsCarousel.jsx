import React, { useEffect, useState } from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import axios from 'axios';

export default function TagsCarousel() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5500/api/songsTags')
      .then((res) => {
        console.log("looking for tags...");
        if (res) {
          console.log(res.data);
          setTags(res.data);
        }
      });
  }, []);

  if (tags.length === 0) {
    return <p>Cargando...</p>;
  }

  return (


    <Carousel show={5} slide={5}>
      {tags.map(tag => (
        <p key={tag} className="tag">{tag}</p>
        ))}
    </Carousel>

  );
}
