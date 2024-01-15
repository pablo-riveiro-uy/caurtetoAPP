import mongoose from "mongoose"

const songsSchema = mongoose.Schema({
	title: String,
	disc: String,
	year: Number,
	lyrics: String,
	tags: [String],
	spotifyLink: String
})

export default mongoose.model('songs', songsSchema)