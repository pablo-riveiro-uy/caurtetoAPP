import React from 'react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Song from './Song';

export default function ListByTags({tag}) {
    const [dataSong, setDataSong] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5500/api/songsByTag'+'Tango')
		.then((res) => {
				console.log("buscando por tag ... ")
				if (res) {
					console.log("Songs by Tag from mongoDB",res.data);
					setDataSong(res.data);
				}
			});
	}, []);
  return (
    <>
    <div className='info-text'>
        <h2>Letras por tag</h2>
        <p>{tag}</p>
    </div>
    <div className="container">

        {
            dataSong.map((s) => {

                return < Song data={s} />
            })
        }
    </div>
    </>
  )
}
