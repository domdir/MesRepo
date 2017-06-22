/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */


import React, { Component } from 'react';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import YearIcon from '/client/ui/components/year_icon/YearIcon.jsx'
import GenreThumbnail from '/client/ui/pages/ini/0_step/GenreThumbnail.jsx'
import MovieThumbnail from '../../components/thumb_trailer/MovieThumbnail.jsx'
import InfoFeatures from '/client/ui/components/info_features/InfoFeatures.jsx'
import SingleMovieToRate from '/client/ui/components/rate/SingleMovieToRate.jsx'
import Modal from 'react-modal';
import FeaturesList from '/client/ui/components/info_features/FeaturesList.jsx'
import { createContainer } from 'meteor/react-meteor-data';

class ExplorePage extends Component {

  constructor(props) {
    super(props);

    this.add_genre_to_selected = this.add_genre_to_selected.bind(this);
    this.remove_genre_from_selected = this.remove_genre_from_selected.bind(this);
    this.state = {
      allMovies: [],
      is_advance_search: false,
      is_loading: false,
      genre_selected: null,
      error: null,
      is_loading_more: false,
      is_load_more: true,
      num_of_movies: 20,
      modalIsOpen: false,
      movie_selected: null,
      f1: "ALL",
      f2: "ALL",
      f4: "ALL",
      f6: "ALL",
		date_load: null,
      years_selected: null

    };
  }

  componentDidMount() {

    this.setState({
      is_loading: true,
	  date_load: (new Date).getTime()
    });
    Meteor.call("s_get_movies", this.state.num_of_movies,
      this.props.genre, this.state.years_selected,
      this.state.f1, this.state.f2, this.state.f4, this.state.f6, (error, result)=> {
        this.setState({
          is_loading: false
        });
        if (error) {
          this.setState({
            error_server: error.reason
          })
        }
        if (result) {

          this.setState({
            allMovies: result
          });
        }
      });
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

  updateMovies(genre, year, f1, f2, f4, f6) {


    this.setState({
      is_loading: true
    });

    Meteor.call("s_get_movies", this.state.num_of_movies, genre,
      year, f1, f2, f4, f6, (err, res)=> {
        this.setState({
          is_loading: false
        });

        if (!err) {
          this.setState({
            allMovies: res
          })
        }
      })
  }

  renderGenres() {

    const genres = [];
    for (key in genres_list) {
      if (genres_list.hasOwnProperty(key)) {
        genres.push(genres_list[key])
      }
    }
    return genres.map((genre, i)=> {
      let is_selected = false;
      if (genre.name == this.state.genre_selected) {
        is_selected = true;
      }
      return <GenreThumbnail
        key={i}
        is_small={true}
        genre_name={genre.name}
        src={genre.img}
        is_selectable={true}
        is_selected={is_selected}
        add_genre_to_selected={this.add_genre_to_selected.bind(this)}
        remove_genre_from_selected={this.remove_genre_from_selected.bind(this)} />
    })
  }

  renderFeature() {
    features = [];
    for (key in feature_list) {
      if (feature_list.hasOwnProperty(key)) {
        features.push(feature_list[key])
      }
    }
    return features.map((feature, i)=> {
      return <FeaturesList
        key={i}
        removeFeature={this.onRemoveFeatureSelect.bind(this)}
        addFeature={this.onAddFeatureSelect.bind(this)}
        f_name={feature.feature_name}
        f_id={feature.feature_id}
        img_src={feature.img} />
    })
  }

  onRemoveFeatureSelect(f) {
    switch (f) {
      case "f1":
      {
        this.setState({
          f1: "ALL"
        });
        this.updateMovies(this.state.genre_selected, this.state.years_selected, "ALL", this.state.f2, this.state.f4, this.state.f6);
        break;
      }
      case "f2":
      {
        this.setState({
          f2: "ALL"
        });

        this.updateMovies(this.state.genre_selected, this.state.years_selected, this.state.f1, "ALL", this.state.f4, this.state.f6);
        break;
      }
      case "f4":
      {
        this.setState({
          f4: "ALL"
        });

        this.updateMovies(this.state.genre_selected, this.state.years_selected, this.state.f1, this.state.f2, "ALL", this.state.f6);
        break;
      }
      case "f6":
      {
        this.setState({
          f6: "ALL"
        });
        this.updateMovies(this.state.genre_selected, this.state.years_selected, this.state.f1, this.state.f2, this.state.f4, "ALL");

        break;
      }
    }
  }

  onAddFeatureSelect(f, value) {

    switch (f) {
      case "f1":
      {

        let new_value = value;
        switch (value) {
          case "VERY_LOW":
          {
            new_value = "VERY_HIGH";
            break
          }
          case "LOW":
          {
            new_value = "HIGH";
            break
          }
          case "MEDIUM":
          {
            new_value = "MEDIUM";
            break
          }
          case "HIGH":
          {
            new_value = "LOW";
            break
          }
          case "VERY_HIGH":
          {
            new_value = "VERY_LOW";
            break
          }
        }


        this.setState({
          f1: new_value
        });
        this.updateMovies(this.state.genre_selected, this.state.years_selected, new_value, this.state.f2, this.state.f4, this.state.f6);

        break;
      }
      case "f2":
      {
        this.setState({
          f2: value
        });
        this.updateMovies(this.state.genre_selected, this.state.years_selected, this.state.f1, value, this.state.f4, this.state.f6);

        break;
      }
      case "f4":
      {
        this.setState({
          f4: value
        });
        this.updateMovies(this.state.genre_selected, this.state.years_selected, this.state.f1, this.state.f2, value, this.state.f6);

        break;
      }
      case "f6":
      {
        this.setState({
          f6: value
        });
        this.updateMovies(this.state.genre_selected, this.state.years_selected, this.state.f1, this.state.f2, this.state.f4, value);
        break;
      }
    }
  }

  /////////////
  add_genre_to_selected(genre_name) {

    this.setState({
      genre_selected: genre_name
    });

    this.updateMovies(genre_name, this.state.years_selected, this.state.f1, this.state.f2, this.state.f4, this.state.f6)

  }

  remove_genre_from_selected() {
    this.setState({
      genre_selected: null
    });
    this.updateMovies(null, this.state.years_selected, this.state.f1, this.state.f2, this.state.f4, this.state.f6)
  }


  handleYearAdd(year) {
    this.setState({
      years_selected: year
    });
    this.updateMovies(this.state.genre_selected, year, this.state.f1, this.state.f2, this.state.f4, this.state.f6)
  }

  handleYearRemove(year) {
    this.setState({
      years_selected: null
    });
    this.updateMovies(this.state.genre_selected, null, this.state.f1, this.state.f2, this.state.f4, this.state.f6)

  }

  /////////

  advancedSearch() {
    this.setState({
      is_advance_search: true
    });
  }

  done() {
    this.setState({
      is_advance_search: false
    });
  }

  renderMovies() {
    // var is_selectable = this.state.movie_selected_id ? false : true;
    if (this.state.allMovies.length == 0) {
      return <div className="jumbotron"><h1>NO MOVIES</h1></div>
    }
    return this.state.allMovies.map((movie)=> {
      movie = JSON.parse(movie);

      return (
        <MovieThumbnail
          key={movie.IMDB_ID}
          movie={movie}
          add_movie_to_selected={this.onMovieSelect.bind(this)}
          is_selected={false}
          is_selectable={true}
        />)
    })
  }

  onMovieSelect(movie) {

    this.setState({
      movie_selected: movie,
      modalIsOpen: true

    });
  }

  onLoadMore() {

    this.setState({
      is_loading: true
    });

    Meteor.call("s_get_movies", this.state.num_of_movies + 10,
      this.props.genre, this.state.years_selected,
      this.state.f1, this.state.f2, this.state.f4, this.state.f6, (error, result)=> {
        this.setState({
          is_loading: false
        });
        if (error) {
          this.setState({
            error_server: error.reason
          })
        }
        if (result) {

          this.setState({
            allMovies: result,
            num_of_movies: this.state.num_of_movies + 10
          });
        }
      });
  }


  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onHandleRecVote(rate, startTime, callBack) {

    this.setState({
      is_loading: true
    });

    const movie = this.state.movie_selected;

    if (movie.IMDB_ID && rate) {
      Meteor.call("save_rec_rate", movie.IMDB_ID, rate, "NONE", -1, startTime, (err, res)=> {
          this.updateMovies(this.state.genre_selected, this.state.years,
            this.state.f1, this.state.f2, this.state.f4, this.state.f6);

          this.setState({
            is_loading: false,
            modalIsOpen: false,
            movie_selected: null

          });

        }
      )
      ;
    }
  }

  render() {

    if (this.props.currentUser) {

      if (this.props.currentUser.ini_step != 5) {

        FlowRouter.go("/ini/" + this.props.currentUser.ini_step)
      }
    }

    const customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: '40'
      },
      content: {
        position: 'absolute',
        top: '90px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '0px',
        background: 'black',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '0px',
        outline: 'none',
        padding: '20px',
        color: 'white'
      }
    };

    let genres = null;
    if (this.state.movie_selected) {
      genres = this.state.movie_selected.GENRES.split("|");

    }
    let years_info = "";

    if (this.state.years_selected) {
      years_info = " (" + this.state.years_selected + "-" + (this.state.years_selected + 9) + ")"
    }
    return (
      <div>

        <div>
          <ul className="list-inline listGenreTop">
            {this.renderGenres()}
          </ul>
        </div>
        <br />
        <div id="container_mes">
          {this.state.is_advance_search ?
            <div className="adv_search">
              <div className="timeLine timeLine_search">
                <h2>Y E A R S</h2>
                {this.renderYears()}
              </div>
              <div className="list-inline">
                <h2>F E A T U R E S</h2>
                <div className="container_feature">
                  {this.renderFeature()}
                </div>
              </div>

              <button className="button_adv" onClick={this.done.bind(this)}>Done</button>
            </div>
            : <button className="button_adv" onClick={this.advancedSearch.bind(this)}> Advanced
                                                                                       Search </button>}
        </div>
        <div className="container" id="container_mes">
          <div className="col-md-12">
            <h2> {this.state.genre_selected ? this.state.genre_selected.toUpperCase()
            + " MOVIES" : "ALL MOVIES" + years_info

            }</h2>
            <li>
              {!this.state.is_loading ? this.renderMovies() :
                <LoadingItem loading_style="loader-spinning" />}
            </li>
            <div>
              {this.state.is_load_more ?
                <div>
                  {!this.state.is_loading_more
                    ? <button onClick={this.onLoadMore.bind(this)} id="loadmore">LOAD MORE</button>
                    : <LoadingItem loading_style="loader-bars" /> }
                </div> : <div className="row"><br /><br /></div>}
            </div>
          </div>
        </div>


        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          onRequestClose={this.closeModal.bind(this)}>
          <div className="closeModal" onClick={this.closeModal.bind(this)}>x</div>
          {this.state.movie_selected ?
            <div className="movie_modal">
              <SingleMovieToRate
                onHandleVote={this.onHandleRecVote.bind(this)}
                imdb_id={this.state.movie_selected.IMDB_ID}
                poster_img={this.state.movie_selected.POSTER}
                is_already_voted={this.state.movie_selected.IS_ALREADY_VOTED}
                is_show_bottom_title={true}
                genres={this.state.movie_selected.GENRES}
                imdb_rating={this.state.movie_selected.IMDB_RATING}
                yt_url={this.state.movie_selected.YOU_TUBE_ID}
                can_skip={false}
                message="YOU HAVE ALREADY VOTED THIS MOVIES"
                movie_title={this.state.movie_selected.TITLE}
                year={this.state.movie_selected.YEAR}>

                <InfoFeatures
                  title={this.state.movie_selected.TITLE}
                  genre={genres}
                  f1={this.state.movie_selected.f1.toFixed(2)}
                  f2={this.state.movie_selected.f2.toFixed(2)}
                  f4={this.state.movie_selected.f4.toFixed(2)}
                  f6={this.state.movie_selected.f6.toFixed(2)} />
              </SingleMovieToRate>
            </div> : null}
        </Modal>

      </div>
    )
  }
}

export default createContainer(() => {


  const handleUser = Meteor.subscribe("pub_myself");
  let currentUser = null;
  if (handleUser.ready()) {
    currentUser = Meteor.user();

  }
  FlowRouter.watchPathChange();
  return {
    currentUser
  };
}, ExplorePage);

const years = [
  1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010
];


const genres_list = {
  'ACTION': { "name": 'Action', "img": 'action.png' },
  'ADVENTURE': { "name": 'Adventure', "img": 'adventure.png' },
  'ANIMATION': { "name": 'Animation', "img": 'animation.png' },
  'CHILDREN': { "name": 'Children', "img": 'children.png' },
  'COMEDY': { "name": 'Comedy', "img": 'comedy.png' },
  'CRIME': { "name": 'Crime', "img": 'crime.png' },
  'DOCUMENTARY': { "name": 'Documentary', "img": 'documentary.png' },
  'DRAMA': { "name": 'Drama', "img": 'drama.png' },
  'FANTASY': { "name": 'Fantasy', "img": 'fantasy.png' },
  'HORROR': { "name": 'Horror', "img": 'horror.png' },
  'MUSICAL': { "name": 'Musical', "img": 'musical.png' },
  'ROMANCE ': { "name": 'Romance', "img": 'romance.png' },
  'SCIFI': { "name": 'SciFi', "img": 'scifi.png' },
  'THRILLER': { "name": 'Thriller', "img": 'thriller.png' },
  'WESTERN': { "name": 'Western', "img": 'western.png' }
};

const feature_list = {
  "1": { "feature_id": "f1", "feature_name": "Shootlens", "img": "/features_icon/cornermotion.png" },
  "2": { "feature_id": "f2", "feature_name": "Color variance", "img": "/features_icon/colorvariance.png" },
  "3": { "feature_id": "f4", "feature_name": "Object Motion", "img": "/features_icon/objectmotion.png" },
  "4": { "feature_id": "f6", "feature_name": "Lightening Key ", "img": "/features_icon/lightening.png" }
};