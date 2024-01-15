import express from "express"
import mongoose from "mongoose"
import songs from "./models/songs.js"
import 'dotenv/config'
import cors from "cors";


// backend port
const port = 5500

// DB connection
const DB_URL = process.env.MONGODB_URL
	? process.env.MONGODB_URL
	: 'mongodb://localhost/databaseTest'

const mongoURL = DB_URL

const connection = mongoose.connection

connection.once('open', () =>
	console.log('Db is connected')
)

mongoose.connect(mongoURL);


const app = express()

// backend app setting
app.set('port', process.env.PORT || 5500)
// backend set for sizing
app.use(express.json({ limit: "50mb" }))
// middelwares
app.use(cors())

// Endpoints

// Take a post request from endpoint and creates a post on DB
app.post('/api/songs', async (req, res) => {
	// data on post body
	let allData = req.body
	// traffic var
	let dataForMongo = []
	allData.forEach(song => {
		dataForMongo.push({
			title: song.title,
			disc: song.disc,
			year: song.year,
			lyrics: song.lyrics,
			tags: song.tags
		})
	})

	// creates records on DB using base model with mongoose method CREATE
	await songs.create(dataForMongo)


})

// Delete request, delete all data from DB

app.delete('/api/songs', async (req, res) => {
	try {
		await songs.deleteMany()
	} catch (err) {
		console.error('Error deleting  data:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}

})

// get all data from DB

app.get("/api/songs", async (req, res) => {
	try {
		// Retrieve data from MongoDB
		const data = await songs.find();

		// Send the data as a response
		res.json(data);
	} catch (error) {
		console.error('Error retrieving data:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}

})

app.listen(port, () => {
	console.log(`Server is listening at http://localhost::${port}`)
})


