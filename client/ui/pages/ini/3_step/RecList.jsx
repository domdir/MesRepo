/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import MovieThumbnail from '/client/ui/components/thumb_trailer/MovieThumbnail.jsx'
import SingleMovieToRate from '/client/ui/components/rate/SingleMovieToRate.jsx'

import Modal from 'react-modal';

export default class RecList extends Component {

   constructor( props ) {
      super( props );
      
      this.onHandleVote = this.onHandleVote.bind(this);

      this.state = {
         modalIsOpen: false,
         movie_selected:null,
		 opened_date:null,
		 reported:0
      };
   }


   openModal(movie) {
      timestamp=new Date().getTime()
      this.setState( {
         modalIsOpen: true,
         movie_selected:movie,
		 opened_date: timestamp
      } );
   }
   
   onHandleVote(rate, startTime, reported, callBack) {
       
       if (this.state.movie_selected.IMDB_ID && rate) {
          Meteor.call("save_ini_rate",this.state.movie_selected.IMDB_ID, rate, startTime, reported,this.props.rec_type, (err, res)=> {
             //callBack();

             this.setState({
                modalIsOpen: false,
                movie_selected: null,
                is_loading: false,
                error: null

             });

             if (err) {
                this.setState({
                   modalIsOpen: false,
                   movie_selected: null,
                   error: err.reason
                })
             }
          });
       }
    }


   renderMovies() {
      return this.props.rec_movies.map( ( movie, i )=> {
		 isOn=(this.state.movie_selected==movie)
         return (
           <MovieThumbnail
             key={i}
             movie={movie}
             is_selected={false}
             is_selectable={false}
             open_modal={this.openModal.bind(this)} 
			 movieOn={isOn}
			 timeTrailer={0}
			 mouseOverTime={0}
			 checkTime={true}
			 />)
			 
      } )
   }
   closeModal(){
	   if (this.state.movie_selected.IMDB_ID) {
	  Meteor.call("save_ini_rate", this.state.movie_selected.IMDB_ID, -1,this.state.opened_date,this.state.reported,this.props.rec_type)
	  }
      this.setState( {
         modalIsOpen: false,
		 movie_selected: null,
		 reported: 0
      } );
   }

   render() {
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
      return (
        <div>
           <div className="rec-list">
              <h1>{this.props.list_title}</h1>
              <div className="movieContainer">

                 <div className="container" id="container_mes">
                    <div id="listMovies">
                       <li>
                          {this.renderMovies()}
                       </li>
                    </div>
                 </div>
              </div>
           </div>

           <Modal
             isOpen={this.state.modalIsOpen}
             style={customStyles}
             onRequestClose={this.closeModal.bind(this)}>
              <button className="btn btn-default button_ini" onClick={this.closeModal.bind(this)}>GO BACK
              </button>
              {this.state.movie_selected ?
                <div className="movie_modal">
                   <SingleMovieToRate
                     onHandleVote={this.onHandleVote}
                     imdb_id={this.state.movie_selected.IMDB_ID}
                     poster_img={this.state.movie_selected.POSTER}
                     is_already_voted={true}
                     is_show_bottom_title={false}
                     genres={this.state.movie_selected.GENRES}
                     imdb_rating={this.state.movie_selected.IMDB_RATING}
                     yt_url={this.state.movie_selected.YOU_TUBE_ID}
                     can_skip={false}
                     message=""
                     movie_title={this.state.movie_selected.TITLE}
                     year={this.state.movie_selected.YEAR}>
                   </SingleMovieToRate>
                </div> : null}
           </Modal>

        </div>
      )

   }
}  
