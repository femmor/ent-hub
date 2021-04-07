import React, {useState, useEffect} from 'react'
import axios from "axios"
import SingleContent from "../../components/SingleContent/SingleContent"
import CustomPagination from "../../components/CustomPagination/CustomPagination"
import "./Movies.css"
import Genres from '../../components/Genres/Genres'

const MoviesScreen = () => {
  const [page, setPage] = useState(1)
  const [movie, setMovie] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  const fetchMovies = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)

    setMovie(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchMovies()
  }, [page])

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type='movie'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies">
        {
          movie ? movie.map(item => (
            <SingleContent 
              key={item.id} 
              id={item.id}
              title={item.title || item.name} 
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              poster={item.poster_path}
              vote_average={item.vote_average}
            />
          )) : (
            <>
              <h2>No Available Movies</h2>
            </>
          )
        }
      </div>
      {numOfPages > 1 && <CustomPagination className="pagination" setPage={setPage} numOfPages={numOfPages}/>}
    </div>
  )
}

export default MoviesScreen
