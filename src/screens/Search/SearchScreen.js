import { Button, createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'

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
  const [type, setType] = useState(0)

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
          <Button variant="contained" style={{ marginLeft: 10 }}>
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
    </>
  )
}

export default SearchScreen
