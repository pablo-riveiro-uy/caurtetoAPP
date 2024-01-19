import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function AddTags_Page() {

	const urlBase = "http://localhost:5500"
	const [dataSong, setDataSong] = useState([]);
	const [finalTagList, setFinalTagList] = useState([]);
	const [tittleToSearch, setTitleToSearch] = useState('')
	const [tagList, setTagList] = useState([])
	const [tag, setTag] = useState([])



	function getSongByTitle(title) {
		console.log("typed title", title);
		axios.get(`${urlBase}/api/songsByTitle/${title}`)
			.then((res) => {
				if (res) {
					console.log("asked song from DB", res.data)
					setDataSong(res.data)
					let tags = res.data.tags
					setTagList(tags)
					console.log("taglist actualizada ", tagList)
				}
			})

	}


	function handleChangeAddTag(e) {
		e.preventDefault()
		const value = e.target.value;
		setTag(value)
	}

	function handleChange(e) {
		e.preventDefault()
		const value = e.target.value;
		setTitleToSearch(value);
	}

	function handleAdd(e) {
		e.preventDefault()
		let newList = []
		newList = tagList
		newList.push(tag)
		setFinalTagList(newList)
		console.log("nueva lista ", finalTagList)

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
					<input onChange={handleChangeAddTag}>
					</input>
					<div className="searchButton" onClick={handleAdd}>
						Agregar
					</div>
				</form>
				<div className="list">
					{tagList.tags && tagList.tags.length > 0 && tagList.tags.map((t) => <p>{t}</p>)}
				</div>
				<div>
					<button type="submit">Actualizar tags</button>
				</div>
			</div>
		</div>
	)
}
