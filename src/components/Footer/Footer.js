import React, {useState} from "react"
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import WhatsHotIcon from "@material-ui/icons/Whatshot"
import Movie from "@material-ui/icons/Movie"
import TvIcon from "@material-ui/icons/Tv"
import Search from "@material-ui/icons/Search"

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "var(--primary-color)",
    zIndex: 100
  },
});

const Footer = () => {

  const classes = useStyles();
  const [value, setValue] = useState('trending');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction style={{ color: "var(--light-brown)"}} label="Trending" value="trending" icon={<WhatsHotIcon />} />
        <BottomNavigationAction style={{ color: "var(--light-brown)"}} label="Movies" value="movie" icon={<Movie />} />
        <BottomNavigationAction style={{ color: "var(--light-brown)"}} label="TV Series" value="tv" icon={<TvIcon />} />
        <BottomNavigationAction style={{ color: "var(--light-brown)"}} label="Search" value="search" icon={<Search />} />
      </BottomNavigation>
    </div>
  )
}

export default Footer
