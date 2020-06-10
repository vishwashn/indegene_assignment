import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const fetchMovies = ({ title, year }) => {
  return dispatch => {
    Axios
      .get(`https://www.omdbapi.com/?s=${title}&y=${year}&apikey=96aeca02`)
      .then(res => {
        if(res.data.Response === "True")
          dispatch({type: actionTypes.fetchMovies, movies: res.data.Search})
        else
          dispatch({type: actionTypes.error, error: res.data.Error})
      })
      .catch(err => console.log(err));
  };
};
