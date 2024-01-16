import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Song from './Song';

export default function ListAllLyrics() {
	const [dataSong, setDataSong] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5500/api/songs')
			.then((res) => {
				if (res) {
					console.log(res.data);
					setDataSong(res.data);
				}
			});
	}, []);

	return (
		<>
			<h2>Todas las letras</h2>
			<p>agarrate Mabel</p>
			{
				dataSong.map((s) => {

					return < Song data={s} />
				})
			}
		</>
	);
}
