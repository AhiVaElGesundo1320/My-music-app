import React, { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import '../Components/MusicAppStyles.css'


const MusicApp = () => {
   const [results, setResults] = useState({});
   const [searching, setSearching] = useState("");  

   const handleGetSearch = () => {
    fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searching}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "312817a771msh73ad59ca79f6c28p1a41e9jsn44f6a4fd97aa",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((mdata) => {
        console.log(mdata);

        const searchResults = mdata.data.map((item) => {
          return {
            name: item.artist.name,
            imgArtist: item.artist.picture_xl,
            id: item.id,
            albumName: item.album.title,
            imgAlbum: item.album.cover_xl,
            preview: item.preview,
            songName: item.title,
            trackList: item.album.tracklist,
          };
        });

        setResults(searchResults);
        console.log(results);
        console.log(searchResults);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      
      <div className="navbar">
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearching(e.target.value)}
          />
        </form>
        <button
          onClick={() => {
            handleGetSearch();
          }}
        >
          <i
            className="fas fa-search fa-2x"
            style={{ color: "#966ebf" }}
          ></i>
        </button>
      </div>
      
    
      <div className="results-div">
        {results.length &&
          results.map((r) => (
            <div key={r.id}className="results">
              <h1 className="font-effect-neon">{r.name}</h1>
              <img
                className="artist-img"
                src={r.imgArtist}
                width="150px"
                alt="img2"
              />
              <h3 className="font-effect-neon">{r.albumName}</h3>
              <img
                className="album-img"
                src={r.imgAlbum}
                width="300px"
                alt="img"
              />

              <br />
              <p className="font-effect-neon">{r.songName}</p>

              <div>
                <ReactAudioPlayer
                  className="reproductor"
                  src={r.preview}
                  controls
                />
              </div>
            </div>
          ))}          
      </div>    
      <div className='footer'><p>Search & Find Your Favorite Music...</p></div>
    </div>
  )
}

export default MusicApp
