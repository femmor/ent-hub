import React, {useEffect} from 'react'
import { Chip } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios'


const Genres = ({ type, setPage, selectedGenres, genres, setGenres, setSelectedGenres }) => {

  const api_key = process.env.REACT_APP_API_KEY

  const fetchGenres = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`)

    setGenres(data.genres)
  }

  useEffect(() => {
    fetchGenres()

    // Unmount
    return () => {
      setGenres({})
    }
    // eslint-disable-next-line 
  }, [])

  const handleAdd = (genre) => {
    // Add genre to the selectedGenres array
    setSelectedGenres([...selectedGenres, genre])
    // remove genre from the genres array
    setGenres(genres.filter(g => g.id !== genre.id))
    setPage(1)
  };

  const handleRemove = (genre) => {
    // Remove genre from the selectedGenres array
    setSelectedGenres(selectedGenres.filter(selected => selected.id !== genre.id))
    setGenres([...genres, genre])
    setPage(1)
  };

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres && selectedGenres.map((genre) => (
        <Chip 
          key={genre.id} 
          label={genre.name} 
          style={{ margin: 2 }}
          clickable
          size="small"
          color="primary"
          onDelete={() => handleRemove(genre)}
          />
      ))}
      {genres && genres.map((genre) => (
        <Chip 
          key={genre.id} 
          label={genre.name} 
          style={{ margin: 2 }}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
          />
      ))}
    </div>
  )
}

export default Genres
