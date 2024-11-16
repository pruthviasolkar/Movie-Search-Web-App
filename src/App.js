import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Components/Searchbar.js";
import MovieList from "./Components/MovieList";
import MovieModal from "./Components/MovieModal.js";
import "./App.css";

const API_KEY = "process.env.REACT_APP_OMDB_API_KEY"; // Replace with your OMDB API key
const API_URL = " http://www.omdbapi.com/";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    const response = await axios.get(`${API_URL}?s=batman&apikey=${API_KEY}`);
    setMovies(response.data.Search || []);
  };

  const fetchMovies = async (query) => {
    if (!query) return;
    const response = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
    setMovies(response.data.Search || []);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchMovies(query);
  };

  const handleMovieClick = async (id) => {
    try {
      const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Failed to fetch movie details:", error.message);
    }
  };
  
  const closeModal = () => setSelectedMovie(null);
  

  return (
    <div className="App">
      <img className="mainlogo" src="/movielogo.png" alt="" />
      <h1> </h1>
      <Searchbar onSearch={handleSearch} />
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
