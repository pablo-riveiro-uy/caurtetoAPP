import axios from 'axios';
import { getLyricByTitle, getAllsongs, getAlbumYear } from './getLyrics.js';

let allSongs = []
let lyrics = ''
let year = 1900


const fetchData = async () => {
  try {
    allSongs = await getAllsongs();

    if (allSongs && allSongs.length > 0) {
      const songsToSave = [];
      for (const song of allSongs) {
        lyrics = await getLyricByTitle(song.title);
        year = await getAlbumYear(song.album_id);

        songsToSave.push({
          title: song.title,
          disc: song.album,
          year: year,
          lyrics: lyrics
        });

      }


      // test post
      axios.post('http://localhost:5500/api/songs', songsToSave)
        .then((res) => console.log(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

fetchData()
