/*
 *created with ♥ by Gianluca Chiap
 */

/*import React, { Component } from 'react';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import YearIcon from '/client/ui/components/year_icon/YearIcon.jsx'
import GenreThumbnail from '/client/ui/pages/ini/0_step/GenreThumbnail.jsx'
import Feature from '/client/ui/components/info_features/Feature.jsx'

export default class HomePage extends Component {

   constructor(props) {
      super(props);

      this.add_genre_to_selected = this.add_genre_to_selected.bind(this);
      this.remove_genre_from_selected = this.remove_genre_from_selected.bind(this);
      this.state = {
         allMovies: [],
         is_advance_search: false,
         is_loading: false,
         genres_selected: [],
         error: null,
         num_of_movies: 10,
         Corner_Motion: {min: 0, max: 1},
         Color_variance: {min: 0, max: 1},
         Object_Motion: {min: 0, max: 1},
         Lightening_Key: {min: 0, max: 1},

         years_selected: [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010]

      };
   }

   componentDidMount() {

      this.setState({
         is_loading: true
      });

      Meteor.call("s_get_n_ini_movies", 5, this.props.genre, this.state.years_selected, (error, result)=> {
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


   handleYearAdd(year) {
      const years_selected = this.state.years_selected;
      years_selected.push(year);

      this.setState({
         years_selected: years_selected
      });
      this.updateMovies()
   }

   handleYearRemove(year) {
      var years_selected = this.state.years_selected;
      var index = years_selected.indexOf(year);
      if (index > -1) {
         years_selected.splice(index, 1);
      }
      this.setState({
         years_selected: years_selected
      });
      this.updateMovies()

   }


   add_genre_to_selected(genre_name) {

      const genresSelected = this.state.genres_selected;
      genresSelected.push(genre_name);
      this.setState({
         genres_selected: genresSelected
      });
      this.updateMovies()

   }

   remove_genre_from_selected(genre_name) {
      const genresSelected = this.state.genres_selected;
      var index = genresSelected.indexOf(genre_name);
      if (index > -1) {
         genresSelected.splice(index, 1);
      }
      this.setState({
         genres_selected: genresSelected
      });
      this.updateMovies()
   }

   renderYears() {
      return years.map((year, i)=> {
         var is_selected = _.contains(this.state.years_selected, year);

         return <YearIcon onYearAdd={this.handleYearAdd.bind(this)}
                          onYearRemove={this.handleYearRemove.bind(this)}
                          is_selected={is_selected}
                          key={i}
                          year={year} />
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
         const is_selected = _.contains(this.state.genres_selected, genre.name);

         return <GenreThumbnail
           key={i}
           genre_name={genre.name}
           src={genre.img}
           is_selectable={true}
           is_selected={is_selected}
           add_genre_to_selected={this.add_genre_to_selected}
           remove_genre_from_selected={this.remove_genre_from_selected} />
      })
   }

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

   renderFeature() {
      features = [];
      for (key in feature_list) {
         if (feature_list.hasOwnProperty(key)) {
            features.push(feature_list[key])
         }
      }
      return features.map((feature, i)=> {
         
         return <Feature
           key={i}
           f_onHandleChanges={this.onHandleFeatureChange.bind(this)}
           f_name={feature.feature_name}
           f_img={feature.img} />
      })
   }

   onHandleFeatureChange(feature, min, max) {

   }
   renderMovies() {
      // var is_selectable = this.state.movie_selected_id ? false : true;

      return this.state.allMovies.map((movie)=> {
         movie = JSON.parse(movie);

         return (
           <MovieThumbnail
             key={movie.IMDB_ID}
             movie={movie}
             is_selected={false}
             is_selectable={true}
             add_movie_to_selected={this.onAddMovieToSelected}
             remove_movie_from_selected={this.onRemoveMovieToSelected} />)
      })
   }

   render() {
      return (
        <div>
           {this.renderFeature()}
           {this.state.is_advance_search ?
             <div>
                <div className="timeLine">
                   {this.renderYears()}
                </div>

                <div className="modalgenre">
                   {this.renderGenres()}
                </div>
                <button onClick={this.done.bind(this)}> Done</button>
             </div>
             : <button onClick={this.advancedSearch.bind(this)}> Advanced Search </button>}

           <ul className="list-inline" id="listMovies">
              <li>
                 {!this.state.is_loading ? this.renderMovies() :
                   <LoadingItem loading_style="loader-spinning" />}
              </li>
           </ul>
        </div>
      )
   }
}


const years = [
   1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010
];


const genres_list = {
   'ACTION': {"name": 'Action', "img": 'action.png'},
   'ADVENTURE': {"name": 'Adventure', "img": 'adventure.png'},
   'ANIMATION': {"name": 'Animation', "img": 'animation.png'},
   'CHILDREN': {"name": 'Children', "img": 'children.png'},
   'COMEDY': {"name": 'Comedy', "img": 'comedy.png'},
   'CRIME': {"name": 'Crime', "img": 'crime.png'},
   'DOCUMENTARY': {"name": 'Documentary', "img": 'documentary.png'},
   'DRAMA': {"name": 'Drama', "img": 'drama.png'},
   'FANTASY': {"name": 'Fantasy', "img": 'fantasy.png'},
   'HORROR': {"name": 'Horror', "img": 'horror.png'},
   'MUSICAL': {"name": 'Musical', "img": 'musical.png'},
   'ROMANCE ': {"name": 'Romance', "img": 'romance.png'},
   'SCIFI': {"name": 'SciFi', "img": 'scifi.png'},
   'THRILLER': {"name": 'Thriller', "img": 'thriller.png'},
   'WESTERN': {"name": 'Western', "img": 'western.png'}
};

const feature_list = {
   "1": {"feature_name": "Corner Motion", "img": "/features_icon/cornermotion.png"},
   "2": {"feature_name": "Color variance", "img": "/features_icon/colorvariance.png"},
   "3": {"feature_name": "Object Motion", "img": "/features_icon/objectmotion.png"},
   "4": {"feature_name": "Lightening Key ", "img": "/features_icon/lightening.png"}


};*/