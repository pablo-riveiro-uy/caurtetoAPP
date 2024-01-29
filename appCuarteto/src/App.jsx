import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListAllLyrics from './Components/ListAllLyrics'
import AddTags_Page from './Pages/AddTags_Page'

import TagsCarousel from './Components/TagsCarousel'


function App() {

	return (

		<BrowserRouter>
			<div className='header'>
				<h1>CuartetAPP</h1>
				<div className="header_text">

					<h3>Una página trucha dedicada a las letras del Cuarteto de Nos</h3>
					<p>y aunque la creó <span>Pablo Riveiro</span> esta va a ser una App de Nos</p>
				</div>
				<div className='logo_container'>

					<img className="logo_caurteto " src="/logo_cuarteto.webp" alt="log cuarteto" />
				</div>
			</div>
			<div className="tag-options">
				<h2>Elige una opcion</h2>


					<TagsCarousel />

			</div>



			<Routes>
				<Route path="/" element={<ListAllLyrics />} />
				<Route path="/addTags" element={<AddTags_Page />} />
			</Routes>
		</BrowserRouter>





	)
}

export default App
