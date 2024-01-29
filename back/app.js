import express from "express"
import mongoose from "mongoose"
import songs from "./models/songs.js"
import 'dotenv/config'
import cors from "cors";
import { stringify } from "flatted"; 




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


app.use(cors())



// Endpoints

// get all songs from DB

app.get("/api/songs", async (req, res) => {
	try {
		// Retrieve data from MongoDB
		const data = await songs.find();

		// Send the data as a response
		res.send(data)

	} catch (err) {
		console.error('Error retrieving data:', err);
		res.status(500).json({ err: 'Internal Server Error' });
	}

})

// get all tags from songs on DB

app.get("/api/songsTags", async (req, res) => {
	try {
	  const tags = await songs.distinct("tags");
	  // console.log("all song tags from DB", tags);
	  const tagsJSON = stringify(tags); // Utiliza la función stringify importada correctamente
	  res.status(200).send(tagsJSON);
	} catch (err) {
	  console.error('Error retrieving tags from DB:', err);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  // songs by tag

 app.get('/api/songsByTag/:tag', async (req, res) => {
	try {
		const tag = req.params.tag
		const data = await songs.find({tags : tag})
		console.log(data)
		res.send(res.data)
	} catch (err) {
		console.error('Error retrieving songs by tag from DB:', err);
		
	}
 })
// Take a post request from endpoint and creates a post on DB
app.post('/api/songs', async (req, res) => {
	try {
		let posts = 0
		// traffic var
		let dataForMongo = []
		req.body.forEach(song => {
			dataForMongo.push({
				title: song.title,
				disc: song.disc,
				year: song.year,
				lyrics: song.lyrics,
				tags: song.tags
			})
			posts +=1
		})

		// creates records on DB using base model with mongoose method CREATE
		await songs.create(dataForMongo)
		console.log(`you have post ${posts} docs`)

	} catch (err) {
		console.error('Error posting  data to DB:', err);
		res.status(500).json({ err: 'Internal Server Error' });

	}


})

// edit tags of a song with a specific id

app.patch('/api/songs/:id', async (req, res) => {
	try {
		const _id = req.params.id;
		const { tags } = req.body;
		await songs.findOneAndUpdate({ _id: _id }, {
			"tags": tags
		});
		res.json({ message: "Tags Updated" });
	} catch (err) {
		console.log(err)
	}

});




// get a song by id

app.get('/api/songs/:id', async (req, res) => {
	try {
		const _id = req.params.id;
		const specificSong = await songs.findById(_id)
		console.log(specificSong)
		res.json(specificSong)
	} catch (err) {
		console.error('Error retriving specific song  data:', err);
		res.status(500).json({ err: 'Internal Server Error' });
	}
})


// get a song by title
app.get('/api/songsByTitle/:title', async (req, res) => {
	try {
		const decodedTitle = decodeURIComponent(req.params.title);
		console.log("Asked title", decodedTitle)
		const song = await songs.findOne({ title: decodedTitle }).exec();
		console.log("Song data", song)
		res.status(200).json(song);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Error al obtener la canción' });
	}
});


// Delete request, delete all data from DB

app.delete('/api/songs', async (req, res) => {
	try {
		await songs.deleteMany()
	} catch (err) {
		console.error('Error deleting  data:', err);
		res.status(500).json({ err: 'Internal Server Error' });
	}

})





app.listen(port, () => {
	console.log(`Server is listening at http://localhost::${port}`)
})