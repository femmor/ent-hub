import React, {useState, useEffect} from 'react'
import axios from "axios"
import SingleContent from '../../components/SingleContent/SingleContent'
import "./TrendingScreen.css";

const TrendingScreen = () => {
  const [trending, setTrending] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  const fetchTrending = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`)
    setTrending(data.results)
  }

  useEffect(() => {
  fetchTrending()
  }, [])


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
    </div>
  )
}

export default TrendingScreen
