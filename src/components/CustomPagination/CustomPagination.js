import React from 'react'
import Pagination from "@material-ui/lab/Pagination"
import "./CustomPagination.css"
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  } 
})

// const darkTheme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   } 
// })

const CustomPagination = ({ page, setPage, numOfPages = 100 }) => {

  const handlePageChange = page => {
    setPage(page)
    window.scroll(0, 0)
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
      width: "100%"
    }}>
      <ThemeProvider theme={lightTheme}>
        <Pagination 
          color='primary' 
          count={numOfPages} 
          onChange={(e) => handlePageChange(e.target.textContent)}
          // hideNextButton
          // hidePrevButton
          />
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination
