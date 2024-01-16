import React from 'react'

export default function Song({ data }) {


	return (

		<>
			<div className='song'>
				<h3 className="title">Titulo: {data.title}</h3>
				<p>Año: {data.year}</p>
				<h4 className="album">Albun :{data.disc}</h4>
				<div className="lyrics">{data.lyrics}</div>
			</div>

		</>
	)
}
