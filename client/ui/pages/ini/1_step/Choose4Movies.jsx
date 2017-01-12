/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react'
import MovieThumbnail from './../../../components/thumb_trailer/MovieThumbnail.jsx'
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import YearIcon from './../../../components/year_icon/YearIcon.jsx'


export default class Choose4Movie extends React.Component {
  constructor(props) {
    super(props);
    this.onAddMovieToSelected = this.onAddMovieToSelected.bind(this);
    this.onRemoveMovieToSelected = this.onRemoveMovieToSelected.bind(this);

    this.state = {
      allMovies: [],
      is_loading: false,
      movies_selected: [],
      movies_selected_id: [],
      error_server: null,
      current_genre: null,
      is_advance_search: false,
      years_selected: null,
      is_getting_new_movies: false

    };
  }

  componentDidMount() {
    this.setState({
      is_loading: true
    });

    Meteor.call("s_get_n_ini_movies", 10, this.props.genre, this.state.years_selected, [], (error, result)=> {
      this.setState({
        is_loading: false
      });
      if (error) {

        this.setState({
          error_server: error.reason
        })
      } else {

        if (result) {

          const allMovies = [];
          result.forEach(movie=> {
            allMovies.push(JSON.parse(movie))
          });
          this.setState({
            allMovies: allMovies
          });
        }
      }
    });
  }

  onNext() {

    if (this.state.movies_selected_id.length == 4) {

      this.setState({
        is_loading: true
      });
      Meteor.call("s_save_movies_chosen", this.state.movies_selected, (err, res)=> {
        if (res) {
          Meteor.call("s_set_ini_step", 2, err=> {
            if (!err) {
              FlowRouter.setParams({ ini_step: "2" });
            }
          })
        }
      })

    }

  }

  handleYearAdd(year) {
    this.setState({
      years_selected: year
    });
    this.getOtherMovies(year)
  }

  handleYearRemove(year) {
    this.setState({
      years_selected: null
    });
    this.getOtherMovies(null)

  }

  renderYears() {
    return years.map((year, i)=> {
      var is_selected = this.state.years_selected == year;

      return <YearIcon onYearAdd={this.handleYearAdd.bind(this)}
                       onYearRemove={this.handleYearRemove.bind(this)}
                       is_selected={is_selected}
                       key={i}
                       year={year} />
    })
  }


  onAddMovieToSelected(movie) {
    const movieSelected = this.state.movies_selected;
    movieSelected.push(movie);
    const movie_selected_id = this.state.movies_selected_id;
    movie_selected_id.push(movie.IMDB_ID);
    let is_advance_search = this.state.is_advance_search;
    if (movie_selected_id.length == 4) {
      is_advance_search = false;
    }
    this.setState({
      movies_selected: movieSelected,
      movies_selected_id: movie_selected_id,
      is_advance_search: is_advance_search
    });

  }


  onRemoveMovieToSelected(movie) {
    const moviesSelectedId = this.state.movies_selected_id;

    var index = moviesSelectedId.indexOf(movie.IMDB_ID);
    if (index > -1) {
      moviesSelectedId.splice(index, 1);
    }

    let index_1 = null;

    const moviesSelected = this.state.movies_selected;

    moviesSelected.forEach((m, i)=> {
      if (m.IMDB_ID == movie.IMDB_ID) {
        index_1 = i
      }
    });
    moviesSelected.splice(index_1, 1);


    this.setState({
      movies_selected_id: moviesSelectedId,
      movies_selected: moviesSelected
    })
  }


  getOtherMovies(year) {


    this.setState({
      is_getting_new_movies: true
    });

    let y = null;
    if (year == 1940 || year == 1950 || year == 1960 || year == 1970 || year == 1980 || year == 1990 || year == 2000) {
      y = year
    } else {
      y = this.state.years_selected
    }

    console.log(y);

    Meteor.call("s_get_n_ini_movies", 10, this.props.genre, y, this.state.movies_selected_id, (error, result)=> {

      this.setState({
        is_getting_new_movies: false
      });

      if (error) {
        this.setState({
          error_server: error.reason
        })
      }
      if (result) {
        const oldMovies = this.state.allMovies;
        const newMovies = [];
        //

        result.forEach(m=> {
          newMovies.push(JSON.parse(m))
        });
        //
        const newAllMovies = [];

        oldMovies.forEach((movie, i)=> {
          //
          if (movie) {

            if (!_.contains(this.state.movies_selected_id, movie.IMDB_ID)) {
              if (newMovies[i]) {
                newAllMovies.push(newMovies[i])
              } else {
                newAllMovies.push({ IMDB: "ttttttttt" })
              }

            } else {
              newAllMovies.push(movie)
            }
          } else {
            newAllMovies.push({ IMDB: "ttttttttt" })
          }
        });


        this.setState({
          allMovies: newAllMovies,
          movie_selected: null,
          movie_selected_id: null,
          error_server: null
        });
      }
    });

  }


  renderMovies() {
    let isSelectable = true;
    if (this.state.movies_selected_id.length >= 4) {
      isSelectable = false;
    }
    if (this.state.allMovies.length) {
      return this.state.allMovies.map((movie, i)=> {
          //movie = JSON.parse(movie);
          try {
            if (movie.POSTER) {
              const is_selected = _.contains(this.state.movies_selected_id, movie.IMDB_ID);

              return (
                <MovieThumbnail
                  key={i}
                  movie={movie}
                  is_selected={is_selected}
                  is_selectable={isSelectable}
                  add_movie_to_selected={this.onAddMovieToSelected}
                  remove_movie_from_selected={this.onRemoveMovieToSelected} />)
            }
          } catch (e) {
            return null
          }

        }
      )
    } else {
      if (!this.state.error_server) {

        return <div className="jumbotron">
          <h1> No Movies</h1>
        </div>
      } else {
        return null;
      }
    }

  }


  render() {

    var more = "";
    var movie = " MOVIES ";
    var numOfFilmChosen = this.state.movies_selected_id.length;

    if (numOfFilmChosen === 0) {
      more = "";
    } else {
      more = " MORE "
    }

    if (numOfFilmChosen === 3) {
      movie = " GENRE "
    }


    let title = "CHOOSE " + (4 - this.state.movies_selected_id.length) +
      " " + this.props.genre.toUpperCase() + more + "  " + movie + "YOU HAVE SEEN";

    if (numOfFilmChosen === 4) {
      title = "WELL DONE, PRESS NEXT "
    }


    return (
      <div>

        <div className='jumbotron jini' id='jumboini'>
          <h2 className="text-center"><span style={{color: "white"}}>{title}</span></h2>
        </div>

        <div id="container_mes">

          <div >
            <div className="infotime">
              <h6>
                With the timeline, you can choose the period of the trailer.
                Use the dots to select or deselect the period. Initially all are active.
              </h6>
            </div>
            <div className="timeLine timeLine_ini">
              {this.renderYears()}
            </div>


          </div>

          <div>
            {this.state.movies_selected_id.length != 4 ?
              <div className="">
                {!this.state.is_getting_new_movies ?
                  <button className="btn btn-default btn_circle button_ini button4_genre"
                          onClick={this.getOtherMovies.bind(this)}>GET NEW
                                                                   MOVIES
                  </button> : <LoadingItem loading_style="loader-bars" />}
              </div> :
              <button className="btn btn-default button_ini button4_genre"
                      onClick={this.onNext.bind(this)}>N E X T</button>}
          </div>


          <div className="movieContainer">
            {this.state.error_server ?
              <div className="jumbotron"><h1>{this.state.error_server}</h1></div> : null}

            <div className="container" id="container_mes">
              <div id="listMovies">
                <li>
                  {!this.state.is_loading ? this.renderMovies() :
                    <LoadingItem loading_style="loader-spinning" />}
                </li>
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}


const years = [
  1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010
];



