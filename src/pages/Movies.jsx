import React, { Component } from "react";
import { Tabs, Button, Table, Input, Card, DatePicker } from "antd";
import { connect } from "react-redux";
import { fetchMovies } from "../store/actions/movies";
import ModalComponent from "../components/Modal";
import { renderMovieDetails } from "../components/MovieDetails";
import Axios from "axios";

const { TabPane } = Tabs;

class Movies extends Component {
  state = {
    activePage: "movies-table",
    title: "",
    year: "",
    visible: false,
    loading: false
  };

  callback = key => {
    this.setState({ activePage: key });
  };

  modalCallback = () => {
    this.setState({ visible: false });
  };

  onChangeCallback = (target, val) => {
    this.setState({ [target]: val });
  };

  moreDetails = imdbID => {
    this.setState({
      visible: true,
      loading: true
    });
    Axios.get(
      `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=96aeca02`
    ).then(res => this.setState({ loading: false, movieDetails: res.data }));
  };

  moviesColumns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title"
    },
    {
      title: "Year",
      dataIndex: "Year",
      key: "Year"
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type"
    },
    {
      title: "",
      key: "imdbID",
      dataIndex: "imdbID",
      render: imdbID => (
        <Button
          key={imdbID}
          style={{ color: "#1890ff" }}
          onClick={() => this.moreDetails(imdbID)}
          type="link"
          ghost
        >
          More details
        </Button>
      )
    }
  ];

  fetchMovies = () => {
    const { title, year } = this.state;
    let titleError = false;
    let yearError = false;
    if (title.trim() === "") titleError = true;
    if (year.trim() === "") yearError = true;
    if (!titleError && !yearError) this.props.fetchMovies({ title, year });
    this.setState({ titleError, yearError });
  };

  render() {
    const {
      title,
      visible,
      movieDetails,
      loading,
      titleError,
      yearError
    } = this.state;
    const { movies, error } = this.props;
    return (
      <div className="movies-container">
        <h2>OMDB Movies</h2>
        <ModalComponent
          visible={visible}
          movieDetails={movieDetails}
          modalCallback={this.modalCallback}
          loading={loading}
        />
        <Input
          style={{
            width: "300px",
            backgroundColor: titleError ? "#fcdede" : "white"
          }}
          onChange={e => this.onChangeCallback("title", e.target.value)}
          value={title}
          placeholder="Movie title"
        />
        <DatePicker style={{
            width: "100px",
            marginLeft: "10px",
            backgroundColor: yearError ? "#fcdede" : "white"
          }} placeholder="Year" onChange={(date, dateString) => this.setState({year: dateString})} picker="year" />
        <Button type="primary" onClick={this.fetchMovies}>
          Search
        </Button>
        <div style={{ color: "red", padding: 10 }}>{error}</div>
        <Tabs defaultActiveKey="movies-list" onChange={this.callback}>
          <TabPane tab="Movies list" key="movies-list">
            <Table columns={this.moviesColumns} dataSource={movies} />
          </TabPane>
          <TabPane tab="Movies Details" key="movie-details">
            <div className="movie-details-container">
              {movies.map(movie => (
                <Card key={movie.imdbID} style={{ width: 330, margin: 10 }}>
                  {renderMovieDetails(movie)}
                </Card>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movies,
    error: state.movies.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: ({ title, year }) => dispatch(fetchMovies({ title, year }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
