import Login from "./components/Login";
import Movies from "./components/Movies";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Results from "./components/Results";
import Favs from './components/Favs'
import {useState, useEffect} from 'react'


function App() {

  const [favorites, setFavorites] = useState([]);
  useEffect(()=> {
      const favMovie = localStorage.getItem("favs");
      if (favMovie !== null) {
          const favsArray = JSON.parse(favMovie)
          setFavorites(favsArray)
      }

  },[])
  const addOrRemoveFav = (e) => {
    const favMovie = localStorage.getItem("favs");

    let tempMoviesInFavs;

    if (favMovie === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovie);
    }
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h1').innerText;
    const overview = parent.querySelector('p').innerText;
    const id = btn.dataset.movieId;
    const movieData = {
      imgURL, title, overview, id
    }

    let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs)
      console.log("add");
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft)
      console.log("delete");
      tempMoviesInFavs = moviesLeft;
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/movies"
          element={<Movies favorites={favorites} addOrRemoveFav={addOrRemoveFav} />}
        />
        <Route path="/detail" element={<Detail />} />
        <Route path="/results" element={<Results />} />
        <Route path="/favs" element={<Favs favorites={favorites} addOrRemoveFav={addOrRemoveFav} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
