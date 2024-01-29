import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Song from './Song';



const APIkey = '184ee7f52d78e8f88edd888eeccbd0c6'

const formatURL = '?format=json&callback=callbcak'

const ApiRoot = 'https://api.musixmatch.com/ws/1.1/'

const artist =`${ApiRoot}${formatURL}artist.search?q_artist?=Cuarteto de Nos&apikey=${APIkey}`

const  url ='https://api.musixmatch.com/ws/1.1/artist.search?q_artist?=Adele&apikey=184ee7f52d78e8f88edd888eeccbd0c6'


export default function ListAllLyrics() {
	const [dataSong, setDataSong] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5500/api/songs')
		.then((res) => {
				console.log("buscando lyrics on DB .. ")
				if (res) {

					setDataSong(res.data);
				}
			});
	}, []);

let clientId = 'c35985fe653644c986741b4f72ca2503'

	return (
		<>
		<div className='info-text'>
			<h2>Todas las letras</h2>
			<p>agarrate Mabel</p>
		</div>
		<div className="container">

			{
				dataSong.map((s) => {

					return < Song data={s} />
				})
			}
		</div>
		</>
	);
}
