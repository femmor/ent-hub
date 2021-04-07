import { Button, createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/CustomPagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
// import CircularProgress from '@material-ui/core/CircularProgress';


const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: "#bb4430"
    }
  } 
})

const SearchScreen = () => {
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [content, setContent] = useState('')
  const [numOfPages, setNumOfPages] = useState()
  const [type, setType] = useState(0)
  // const [loading, setLoading] = useState(true)

  const api_key = process.env.REACT_APP_API_KEY

  // Get searchTerm
  const fetchSearch = async () => {
    try {
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/${ type ? "tv" : "movie"}?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)

      setContent(data.results)
      setNumOfPages(data.total_pages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scroll(0, 0)
    fetchSearch()
  }, [type, page])

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <div style={{ display: 'flex', margin: 15 }} >
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search your favorite movies..."
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}>
            <SearchIcon/>
          </Button>
        </div>

        <div style={{margin: "10px 15px" }}>
          <Tabs
            style={{ paddingBottom: 5 }}
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, newValue) => {
              setType(newValue)
              setPage(1)
            }}
          >
            <Tab style={{ width: "50%"}} label="Search Movies" />
            <Tab style={{ width: "50%"}} label="Search TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>

      <div className="movies">
        {
          content && content.map(item => (
            <SingleContent 
              key={item.id} 
              id={item.id}
              title={item.title || item.name} 
              date={item.first_air_date || item.release_date}
              media_type={type ? "tv" : "movie"}
              poster={item.poster_path}
              vote_average={item.vote_average}
            />
          ))}
          {searchText && !content && (type ? (<h2>No TV Series found</h2>) : (<h2>No Movies found</h2>))}
      </div>
      {numOfPages > 1 && <CustomPagination className="pagination" setPage={setPage} numOfPages={numOfPages}/>}
    </>
  )
}

export default SearchScreen
