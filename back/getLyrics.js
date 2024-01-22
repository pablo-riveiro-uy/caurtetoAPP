import axios from 'axios';

const APIkey = '184ee7f52d78e8f88edd888eeccbd0c6';
const ApiRoot = 'https://api.musixmatch.com/ws/1.1/';
const cuarteto_id = '97125';

export const getLyricByTitle = async (original_title) => {
  if (original_title) {


    const title = original_title.replaceAll(" ", "%20");
    const songBytitle = `${ApiRoot}matcher.lyrics.get?apikey=${APIkey}&format=json&q_track=${title}&q_artist=cuarteto%20de%20nos`;
  
    try {
      const response = await axios.get(songBytitle);
      //console.log("Getting a lyric...");
  
        if (response.data.message.body.lyrics.lyrics_body ) {
            const lyric = response.data.message.body.lyrics.lyrics_body ? response.data.message.body.lyrics.lyrics_body : 'no lyric';
            return lyric;
        } else {
            return 'no lryric'
        }
  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

};

export const getAllsongs = async () => {
  const get10songs = `${ApiRoot}track.search?apikey=${APIkey}&format=json&q_artist=cuarteto%20de%20nos&quorum_factor=1&page_size=650&page=1`;
    let track_data = []
  try {
    const response = await axios.get(get10songs)


         const track_list = response.data.message.body.track_list;
         track_list.map((t) => {
          if (t.track.has_lyrics == 1) {
            track_data.push({
              title: t.track.track_name,
              album: t.track.album_name,
              album_id : t.track.album_id

            })
          }
         })
        
        if (track_data) return track_data;
          
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAlbumYear = async (id) => {
  const albumYearURL = `${ApiRoot}album.get?apikey=${APIkey}&format=json&album_id=${id}`;

  try {
    const response = await axios.get(albumYearURL);
    if (response.data.message.body.album.album_release_date && response.data.message.body.album.album_release_date != undefined ) {

      const album_data = response.data.message.body.album.album_release_date ? response.data.message.body.album.album_release_date: '1900' ;
      const year = album_data.slice(0, 4);
      return Number(year);
    } else {
      return 1900
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


    
 


