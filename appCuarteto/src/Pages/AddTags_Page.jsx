import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddTags_Page() {
	const urlBase = "http://localhost:5500";
	const [dataSong, setDataSong] = useState([]);
	const [finalTagList, setFinalTagList] = useState([]);
	const [tittleToSearch, setTitleToSearch] = useState('');
	const [tagList, setTagList] = useState([]);
	const [tag, setTag] = useState('');

	useEffect(() => {
		setFinalTagList(tagList);
	}, [tagList]);

	function getSongByTitle(title) {
		console.log("typed title", title);
		axios.get(`${urlBase}/api/songsByTitle/${title}`)
			.then((res) => {
				if (res) {
					console.log("asked song from DB", res.data);
					setDataSong(res.data);
					let tags = res.data.tags;
					setTagList(tags);
					console.log("taglist actualizada ", tagList);
				}
			});
	}

	function handleChangeAddTag(e) {
		e.preventDefault();
		const value = e.target.value;
		setTag(value);
	}

	function handleChange(e) {
		e.preventDefault();
		const value = e.target.value;
		setTitleToSearch(value);
	}

	function handleAdd(e) {
		e.preventDefault();
		let newList = [...tagList, tag];
		setTagList(newList);
		console.log("nueva lista ", newList);
	}

	function handleSubmit(e) {
		e.preventDefault();
		axios.patch(`${urlBase}/api/songs/${dataSong._id}`, { "tags": finalTagList })
			.then(res => console.log(res.data))
			.catch(err => console.log(err));
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
			</div>
			<div className="form">
				<form>
					<input onChange={handleChangeAddTag}></input>
					<div className="searchButton" onClick={handleAdd}>
						Agregar
					</div>
				</form>
				<div className="actualTags">
					<h3>Tags</h3>

					{finalTagList && finalTagList.length > 0 && finalTagList.map((t, index) => <p key={index}>{t}</p>)}
				</div>

				<div className="searchButton" onClick={handleSubmit}>Actualizar tags</div>

			</div>
		</div>
	);
}
