/*
 * Created with ? by Anghileri Davide
 */


NUM_MOVIES_TO_CAPTURE = 1

import MovieThumbnail from '/client/ui/components/thumb_trailer/MovieThumbnail.jsx'
import React, { Component } from 'react';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import Webcam from 'react-webcam';
import { Line, Circle } from 'rc-progress';



export default class WebcamPage extends Component {

    constructor( props ) {
        super( props );
        this.save_screenshot = this.save_screenshot.bind( this );
        var timer1 = null;
        this.state = {
            welcomeText: "W E L C O M E", //this.props.currentUser.user_name
            title: "",
            is_loading: false,
            error: null,
            movies_selected: [],
            movies_selected_id: [],
            intervalId: null,
            count:0,
            time_finished: false
        };
    }

    componentDidMount() {
        //start_saving_screenshot() {
        if ( !this.state.intervalId ) {
            //call the saving every 4 sec
            var intervalId = setInterval( this.save_screenshot, 4000 );
            // store intervalId in the state so it can be accessed later:
            this.setState( { intervalId: intervalId } );
        }
    }

    onHandleNext() {
        window.scrollTo( 0, 0 )
        if ( this.state.movies_selected_id.length >= NUM_MOVIES_TO_CAPTURE ) {
            Meteor.call( "s_save_movies_chosen", this.state.movies_selected, ( err, res ) => {
                if ( res ) {
                    /*Meteor.call( "s_set_ini_step", 4, err => {
                        if ( !err ) {
                            FlowRouter.setParams( { ini_step: "4" } );
                        }
                    } );*/
					Meteor.call( "s_set_ini_step", 3, err => {
                        if ( !err ) {
                            FlowRouter.setParams( { ini_step: "3" } );
                        }
                    } );
                }
            } );
        }
    }

    restartTime() {
        window.scrollTo( 0, 0 )
        this.setState( {
            welcomeText: "W E L C O M E",
            intervalId: null,
            count:0,
            time_finished: false
        } );
        var intervalId = setInterval( this.save_screenshot, 4000 );
        // store intervalId in the state so it can be accessed later:
        this.setState( { intervalId: intervalId } );
    }



    save_screenshot() {
        
        if(this.state.count>=12){
            clearInterval( this.state.intervalId ); 
            this.setState( {
                welcomeText: "Time is Up, Click restart!",
                time_finished: true
            } );
        }
        this.setState( {
            count: this.state.count+1
        } );

        var screenshot = this.refs.webcam.getScreenshot();

        Meteor.call( 'get_json_movie_by_image', screenshot, function( error, response ) {

            try {


                movie = JSON.parse( String( response[0] ) );

                title = String( movie['TITLE'] );
                movieId = movie['IMDB_ID'];
                year = movie['YEAR'];
                genres = movie['GENRES'];
                length = movie['LENGTH'];

                movie.IMDB_ID = movieId;

                const movies_selected = this.state.movies_selected;
                const movies_selected_id = this.state.movies_selected_id;

                index = movies_selected_id.indexOf( movieId )
                if ( index == -1 ) {
                    movies_selected.push( movie )
                    movies_selected_id.push( movieId )

                    this.setState( {
                        welcomeText: title + "  (" + year + ")  " + length + "min.",
                        movies_selected: movies_selected,
                        movies_selected_id: movies_selected_id
                    } );
                    if ( this.state.movies_selected_id.length >= NUM_MOVIES_TO_CAPTURE ) {
                        clearInterval( this.state.intervalId ); 
                    }
                }
            } catch ( e ) {
                //Movie was not recognized, who cares
                // this.setState( {
                //   welcomeText: "Movie not recognized, try again!",
                // } );
                //this.setState({welcomeText: "Error" + e.message});
            }
        }.bind( this ) );
    }

    onRemoveMovieToSelected( movie ) {
        const moviesSelectedId = this.state.movies_selected_id;

        var index = moviesSelectedId.indexOf( movie.IMDB_ID );
        if ( index > -1 ) {
            moviesSelectedId.splice( index, 1 );
        }

        let index_1 = null;

        const moviesSelected = this.state.movies_selected;

        moviesSelected.forEach(( m, i ) => {
            if ( m.IMDB_ID == movie.IMDB_ID ) {
                index_1 = i
            }
        } );
        moviesSelected.splice( index_1, 1 );


        this.setState( {
            movies_selected_id: moviesSelectedId,
            movies_selected: moviesSelected
        } )
    }

    onAddMovieToSelected( movie ) {
        const movieSelected = this.state.movies_selected;
        movieSelected.push( movie );
        const movie_selected_id = this.state.movies_selected_id;
        movie_selected_id.push( movie.IMDB_ID );
        let is_advance_search = this.state.is_advance_search;
        if ( movie_selected_id.length == NUM_MOVIES_TO_CAPTURE + 1 ) {
            is_advance_search = false;
        }
        this.setState( {
            movies_selected: movieSelected,
            movies_selected_id: movie_selected_id,
            is_advance_search: is_advance_search
        } );

    }


    renderMovies() {
        let isSelectable = false; //we do not have to select detected movies
        if ( this.state.movies_selected.length ) {
            return this.state.movies_selected.map(( movie, i ) => {
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
                        /> )
                    // }
                } catch ( e ) {
                    return <div className="jumbotron">
                        <h1> {e.message}</h1>
                    </div>
                }
            }
            )
        } else {
            if ( !this.state.error_server ) {
                return <div className="jumbotron">
                    <h1> No Movies </h1>
                </div>
            } else {
                return null;
            }
        }
    }


    render() {


        return (
            <div>
                <div className='jumbotron' id="jumbostart2">
                    <div id="Welcome_container">
                        <span id="Welcome_center"  >{this.state.welcomeText}</span></div>
                    <div className="text-center" > 
                     
        
                        <Webcam ref='webcam' audio={false} width='360' height='240' />
                        <div className='controls'>
                     
                      </div>
                        {!this.state.time_finished ? <div></div>
                                : <button onClick={this.restartTime.bind( this )}
                                    className="btn btn-default button_ini">R E S T A R T</button>}
                       {this.state.movies_selected_id.length < NUM_MOVIES_TO_CAPTURE ? <div className="choose_genre"><span
                            style={{ color: "#FFFFFF", fontFamily: 'MESFont5, sans-serif', fontSize: '20px' }}>
                            TAKE A PICTURE OF A MOVIES COVER</span><div id="progress">
                                <Line percent={this.state.movies_selected_id.length * 100} trailWidth="1" trailColor="#494949" strokeWidth="1" strokeColor="#399000" /></div></div>
                            : <button onClick={this.onHandleNext.bind( this )}
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
//BUTTON CAPTURE
/* <button onClick={this.save_screenshot} className="btn btn-primary ">capture</button>*/

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
    'WESTERN': { "name": 'Western', "img": 'western.png' },
};
