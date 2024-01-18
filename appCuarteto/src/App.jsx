import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListAllLyrics from './Components/ListAllLyrics'
import AddTags_Page from './Pages/AddTags_Page'
function App() {


	return (

		<BrowserRouter>
			<h1>CuartetAPP</h1>
			<h3>Una página trucha dedicada a las letras del Cuarteto de Nos</h3>
			<p>y aunque la creó <span>Pablo Riveiro</span> esta va a ser una App de Nos</p>
			<hr />
			<Routes>



				<Route path="/" element={<ListAllLyrics />} />
				<Route path="/addTags" element={<AddTags_Page />} />
			</Routes>
		</BrowserRouter>





	)
}

export default App
