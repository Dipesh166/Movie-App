//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import React from 'react';
import Moviecard from './components/moviecard';
import YouTube from 'react-youtube';




function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/"
  const Api_Url = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([])
  const [searchKey, setsearchKey] = useState("")
  const [selectMovie, setselectMovie] = useState({})
  const[playTrailer, setplayTrailer] = useState(false)


  const fetchmovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover"
    const { data: { results } } = await axios.get(`${Api_Url}/${type}/movie`, {
      params: {
        api_key: "6a5ed49569633067fb5619f757adcd98",
        query: searchKey
      }



    })
    
    setMovies(results)
    await selectmovie(results[0])


  }

  
const fetchMovie = async (id) => {
  const {data} = await axios.get( `${Api_Url}/movie/${id}`, {
    params: {
      api_key: "6a5ed49569633067fb5619f757adcd98",
      append_to_response:'videos'
    }

  })
  return data
}

const selectmovie  = async (movie ) => {
  setplayTrailer(false)
  const data = await  fetchMovie(movie.id)
  
  setselectMovie(data)

}


  









  useEffect(() => {
    fetchmovies();

  }, [])

  const renderMovie = () => (
    movies.map(movie => (

      <>
        <Moviecard key={movie.id}
          movie={movie}
          selectMovie={selectmovie} />
      </>
    ))


  )

  const searchMovies = (e) => {
    e.preventDefault()
    fetchmovies(searchKey);

  }

  
  const renderTrailer = () => {
    const trailer =selectMovie.videos.results.find(videos => videos.name === 'Official Trailer')
    const key= trailer ? trailer.key : selectMovie.videos.results[1].key

    return (
      <>
      <YouTube 
      videoId={key}
      containerClassName={"youtube-container"}
      opts={{
        width:"100%",
        height:"100%",
        playerVars:{
          autoplay:1,
          controls:0
        }
      }

      }
      />
      </>
    )
  }



  return (
    <div className="Apm">

      <header className={'header'}>
        <div className={'header-content max-center'}>
          <span>Latest Movie Trailer</span>

          <form onSubmit={searchMovies}>
            <input type="text" onChange={(e) => setsearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
        </div>
      </header >

      <div className='hero' style={{ backgroundImage: `url('${IMAGE_PATH}${selectMovie.backdrop_path}')` }}>
        <div className='hero-content max-center' >
          { playTrailer ?<button className='button button--close' onClick={() => setplayTrailer(false)}>Close</button> : null}
          {selectMovie.videos && playTrailer ? renderTrailer() : null}
          


          <button button className='hero-button' onClick={() => setplayTrailer(true)}>Play Video</button>
          <h1 className='hero-title'>{selectMovie.title}</h1>
          
        </div>

      </div>

      <div className="Appp max-center">

        {renderMovie()}
      </div>

    </div >





  );
}

export default App;
