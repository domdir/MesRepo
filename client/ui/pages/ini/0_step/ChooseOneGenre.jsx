/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */
MIN_NUM_MOVIES = 1


import MovieThumbnail from './../../../components/thumb_trailer/MovieThumbnail.jsx'
import React, { Component } from 'react';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import Webcam from 'react-webcam';


export default class ChooseOneGenre extends Component {

   constructor(props) {
      super(props);
      this.save_screenshot = this.save_screenshot.bind(this);
      this.state = {
      welcomeText: "W E L C O M E",
         is_loading: false,
         error: null,
	 movies_selected: [],
         movies_selected_id: []
      };
   }

   componentDidMount() {

   }

   onHandleNext() {
      if (this.state.movies_selected_id.length >= MIN_NUM_MOVIES) {
         Meteor.call("s_save_movies_chosen", this.state.movies_selected, (err, res)=> {
            if (res) {
               Meteor.call("s_set_ini_step", 2, err=> {
               if (!err) {
                  FlowRouter.setParams({ ini_step: "2" });
	       }
	       });
	    }
	 });
      }
   } 
   

 save_screenshot(){
      var screenshot = this.refs.webcam.getScreenshot();
	
      Meteor.call('get_json_img', screenshot, function(error, response){
      
	 try{
	 
        movie = response;
        
        
        id = Number(movie[0]["id"]);
        title=(movie[0]["name"]);
        
        
	    movieId = String(movie[1]["IMDB_ID"]);
	    movie.IMDB_ID = movieId;
	    

	    const movies_selected = this.state.movies_selected;
        const movies_selected_id = this.state.movies_selected_id;
	    
	    movies_selected.push(movie)
        movies_selected_id.push(movieId)

	    this.setState({
		    movies_selected: movies_selected,
		    movies_selected_id: movies_selected_id
	    });
         } catch (e) {
		 //Movie was not recognized, who cares
		 this.setState({welcomeText: "Error" + e.message});
         }
      }.bind(this));
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
  
  
  renderMovies() {
    let isSelectable = false; //we do not have to select detected movies
    if (this.state.movies_selected.length) {
      return this.state.movies_selected.map((movie, i)=> {
          //movie = JSON.parse(movie);
          try {
           // if (movie.POSTER) {
              const is_selected = true; //_.contains(this.state.movies_selected_id, movie.IMDB_ID);

              return (
                <MovieThumbnail
                  key={i}
                  movie={movie}
                  is_selected={is_selected}
                  is_selectable={isSelectable}
                  add_movie_to_selected={this.onAddMovieToSelected}
                  remove_movie_from_selected={this.onRemoveMovieToSelected} 
                 />)
           // }
          } catch (e) {
            return <div className="jumbotron">
          <h1> {e.message}</h1>
        </div>
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
      title = "TAKE A PICTURE OF YOUR FAVORITE MOVIES COVERS";

      if (this.state.genre_selected) {
         title = " Thank you, press next "
      }

      if (this.props.currentUser) {
         
         if (FlowRouter.current().params.ini_step != this.props.currentUser.ini_step) {
            
            FlowRouter.go("/ini/"+this.props.currentUser.ini_step)
         }
         if(this.props.currentUser.is_ini){
            FlowRouter.go("/profile");
         }
      }

      return (
        <div>
           <div className='jumbotron' id="jumbostart">
              <h1 className="text-center">{this.state.welcomeText}</h1>
              <div className="text-center">
                <Webcam ref='webcam' audio={false} width='212' height='160'/>
                <div className='controls'>
                  <button onClick={this.save_screenshot}className="btn btn-default button_ini">capture</button>
                </div>
                 {this.state.movies_selected_id.length < MIN_NUM_MOVIES ? <div className="choose_genre"><span
                   style={{color: "#FFFFFF", fontFamily: 'MESFont5, sans-serif', fontSize: '20px', textTransform: 'uppercase'}}>
                       {title}</span></div>
                   : <button onClick={this.onHandleNext.bind(this)}
                             className="btn btn-default button_ini">N E X T</button>}
              </div>
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

           <div className="row">
              {this.state.error ? <div className="jumbotron">
                 <h1> {this.state.error}</h1>
              </div> : null}
           </div>
        </div>
      )
   }
}
export default createContainer( () => {

   const handleUser = Meteor.subscribe( "pub_myself" );
   let currentUser = null;
   if (handleUser.ready()) {
      currentUser = Meteor.user();

   }
   return {
      currentUser
   };
}, ChooseOneGenre );



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
   'WESTERN': {"name": 'Western', "img": 'western.png'},
};
