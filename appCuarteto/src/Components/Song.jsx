import React, { useState, useEffect } from 'react';

export default function Song({ data }) {
  const lyricsFormatter = ({ text }) => {
    // Convert text to an array of characters
    const lyricsArray = Array.from(text);

    let formatedLyrics = [];
    let line = '';

    lyricsArray.forEach((c, index) => {
      if (c !== '\n') {
        line += c;
      } else {
        formatedLyrics.push(
    
            <p key={index}>{line}</p>

 
        );
        line = '';
      }
    });

    // Add the last line if it's not empty
    if (line !== '') {
      formatedLyrics.push(<p key={lyricsArray.length}>{line}</p>);
    }

    return formatedLyrics;
  };

  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    // Convert data.lyrics to an array of characters
    const lyricsArray = Array.from(data.lyrics);

    let formatted = lyricsFormatter({ text: lyricsArray });
    setLyrics(formatted);
  }, [data.lyrics]); // Adding data.lyrics as a dependency for the useEffect

  return (
    <>
      <div className='song'>
        <h3 className='title'>Titulo: {data.title}</h3>
        <p>Año: {data.year}</p>
        <h4 className='album'>Album: {data.disc}</h4>
        <div className='lyrics'>{lyrics.length ? lyrics : <p>loading...</p>}</div>
      </div>
    </>
  );
}
