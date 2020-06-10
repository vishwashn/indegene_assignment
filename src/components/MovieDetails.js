import React from "react";

export const renderMovieDetails = movieDetails => {
  return (
    <>
      <div className="image-container">
        {movieDetails.Poster === "N/A" ? (
          <div className="label">POSTER NOT FOUND</div>
        ) : (
          <img alt={movieDetails.Title} src={movieDetails.Poster} />
        )}
      </div>
      <div className="row">
        <div className="label">Title</div>
        <div>{movieDetails.Title}</div>
      </div>
      <div className="row">
        <div className="label">Release year</div>
        <div>{movieDetails.Year}</div>
      </div>
      <div className="row">
        <div className="label">Type</div>
        <div>{movieDetails.Type}</div>
      </div>
      {movieDetails.Genre && (
        <div className="row">
          <div className="label">Genre</div>
          <div>{movieDetails.Genre}</div>
        </div>
      )}
      {movieDetails.imdbRating && (
        <div className="row">
          <div className="label">Box Office</div>
          <div>
            {movieDetails.imdbRating === "N/A"
              ? "N/A"
              : parseFloat(movieDetails.imdbRating)>7
              ? "Hit"
              : "Flop"}
          </div>
        </div>
      )}
    </>
  );
};
