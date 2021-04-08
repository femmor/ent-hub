import React, {useState, useEffect} from 'react'
import axios from "axios"
import SingleContent from "../../components/SingleContent/SingleContent"
import CustomPagination from "../../components/CustomPagination/CustomPagination"
import "./TvSeriesScreen.css"
import Genres from '../../components/Genres/Genres'
import useGenre from '../../hooks/useGenre'

const TvSeriesScreen = () => {
  const [page, setPage] = useState(1)
  const [series, setSeries] = useState([])
  const [numOfPages, setNumOfPages] = useState()
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  const genreforURL = useGenre(selectedGenres)

  const fetchSeries = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&page=${page}&with_genres=${genreforURL}`)

    setSeries(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchSeries()
  })

  return (
    <div>
      <span className="pageTitle">TV Series</span>
      <Genres
        type='tv'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="series">
        {
          series ? series.map(item => (
            <SingleContent 
              key={item.id} 
              id={item.id}
              title={item.title || item.name} 
              date={item.first_air_date || item.release_date}
              media_type='tv'
              poster={item.poster_path}
              vote_average={item.vote_average}
            />
          )) : (
            <>
              <h2>No Available TV Series</h2>
            </>
          )
        }
      </div>
      {numOfPages > 1 && <CustomPagination className="pagination" setPage={setPage} numOfPages={numOfPages}/>}
    </div>
  )
}

export default TvSeriesScreen
