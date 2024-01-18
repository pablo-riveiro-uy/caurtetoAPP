import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AddTags_Page() {

	const urlBase = "http://localhost:5500"
	const [dataSong, setDataSong] = useState([]);
	const [tittleToSearch, setTitleToSearch] = useState('')



	function getSongByTitle(title) {
		console.log("typed title", title);
		axios.get(`${urlBase}/api/songsByTitle/${title}`)
			.then((res) => {
				if (res) {

					console.log("asked song from DB", res.data)
					setDataSong(res.data)
				}
			})

	}




	function handleChange(e) {
		e.preventDefault()
		const value = e.target.value;
		setTitleToSearch(value);
	}


	return (
		<div>
			<h3>Add tag</h3>

			<div className=''>
				<form>
					<div className='seachBox'>
						<div>

							<label htmlFor="title">Titulo</label>
							<input type="text" onChange={handleChange} id="title" defaultValue={tittleToSearch}></input>
						</div>
						<div type="submit" className='searchButton' onClick={() => getSongByTitle(tittleToSearch)}>Buscar</div>
					</div>

				</form>
			</div>


			<div className="actualSong">
				<div>
					<h4>Titulo :</h4>
					<p>{dataSong.title}</p>
				</div>
				<div className='actualTags'>
					{
						dataSong.tags && dataSong.tags.length > 0 && dataSong.tags.map((t) => <p>{t}</p>)
					}
				</div>

			</div>
			<div className="form">
				<form>
					<input>
					</input>
					<button>
						Agregar
					</button>
				</form>
				<div className="list">
					<ul>
						<li>element</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
