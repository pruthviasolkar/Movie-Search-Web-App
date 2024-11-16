import React from "react";
import Modal from "react-modal";

// Set the app root for accessibility
Modal.setAppElement("#root");

const MovieModal = ({ movie, onClose }) => {
  return (
    <Modal
      isOpen={!!movie} // Open when `movie` is not null
      onRequestClose={onClose} // Close when clicking outside or pressing Esc
      contentLabel="Movie Details"
      className="movie-modal"
      overlayClassName="modal-overlay"
    >
      {movie && (
        <>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Ratings:</strong> {movie.imdbRating}</p>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </Modal>
  );
};

export default MovieModal;
