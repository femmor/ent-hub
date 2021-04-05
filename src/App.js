import { Container } from '@material-ui/core';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import TrendingScreen from './screens/Trending/TrendingScreen'
import TvSeriesScreen from './screens/TvSeries/TvSeriesScreen'
import SearchScreen from './screens/Search/SearchScreen'
import MoviesScreen from './screens/Movies/MoviesScreen'

// Components


function App() {
  return (
    <Router>
        <Header/>
          <div className="App">
            <Container>
              <Switch>
                  <Route component={TrendingScreen} exact path="/"/>
                  <Route component={MoviesScreen} path="/movies"/>
                  <Route component={SearchScreen} path="/search"/>
                  <Route component={TvSeriesScreen} path="/tv-series"/>
              </Switch>
            </Container>
          </div>
        <Footer/>
    </Router>
  );
}

export default App;
