import React, {useState, useEffect} from 'react'
import axios from "axios"
import SingleContent from '../../components/SingleContent/SingleContent'
import "./TrendingScreen.css";
import CustomPagination from '../../components/CustomPagination/CustomPagination';

const TrendingScreen = () => {
  const [page, setPage] = useState(1)
  const [trending, setTrending] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  const fetchTrending = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`)
    setTrending(data.results)
  }

  useEffect(() => {
  fetchTrending()
  // eslint-disable-next-line 
  }, [page])


  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {
          trending ? trending.map(movie => (
            <SingleContent 
              key={movie.id} 
              id={movie.id}
              title={movie.title || movie.name} 
              date={movie.first_air_date || movie.release_date}
              media_type={movie.media_type}
              poster={movie.poster_path}
              vote_average={movie.vote_average}
            />
          )) : (
            <>
              <h2>No Trending Movies</h2>
            </>
          )
        }
      </div>
      <CustomPagination className="pagination" setPage={setPage}/>
    </div>
  )
}

export default TrendingScreen
