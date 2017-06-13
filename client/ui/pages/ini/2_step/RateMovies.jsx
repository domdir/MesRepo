/*
 *created with ♥
 */

import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import SingleMovieToRate from './../../../components/rate/SingleMovieToRate.jsx'
import { routesPath, routesParam } from '/client/router/router';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'

export class RateMovies extends React.Component {
   constructor(props) {
      super(props);

      this.onHandleIniRate = this.onHandleIniRate.bind(this);

      this.state = {
         currentMovieToRate: null,
         is_loading: false,
         error: null,
      date_load: null
        };
    }
	
	componentDidMount() {
	this.setState({
		date_load: (new Date).getTime()
	});
  }
  componentWillUnmount() {
	   pageTime= ((new Date).getTime()-this.state.date_load)/1000
	   Meteor.call("update_page","Ini2Page",pageTime)
  }

   onHandleIniRate(rate, startTime, callBack) {
      
      this.setState({
         is_loading: true
      });
      
      
      
      if (this.props.ini_movies.IMDB_ID && rate) {
         Meteor.call("save_ini_rate", this.props.ini_movies.IMDB_ID, rate, startTime, (err, res)=> {
            //callBack();

            this.setState({
               is_loading: false,
               error: null

            });

            if (err) {
               this.setState({
                  error: err.reason
               })
            }
         });
      }
   }

   renderCurrentMovieToRate() {
      
      
      if (this.props.is_next) {
		  pageTime= ((new Date).getTime()-this.state.date_load)/1000
         Meteor.call("s_set_ini_step", "3",pageTime, err=> {
            if (!err) {
               FlowRouter.setParams({ini_step: 3});
            }
         })
		 
      } else {
         let currentMovieToRate = this.props.ini_movies;
         if (currentMovieToRate) {
            //currentMovieToRate = currentMovieToRate[0];

            

            return <SingleMovieToRate
              onHandleVote={this.onHandleIniRate}
              imdb_id={currentMovieToRate.IMDB_ID}
              poster_img={currentMovieToRate.POSTER}
              movie_title={currentMovieToRate.TITLE}
              year={currentMovieToRate.YEAR}
              is_show_bottom_title={true}
              genres={currentMovieToRate.GENRES}
              yt_url={currentMovieToRate.YOU_TUBE_ID}
            />
         }
      }
   }


   render() {

      return (
        <div>
           {(this.props.ini_movies ||this.props.is_next) && !this.state.is_loading
             ? this.renderCurrentMovieToRate() : <LoadingItem loading_style="loader-spinning" />}

           {this.state.error ? <div className="jumbotron"><h1> {this.state.error}</h1></div> : null}
        </div>)
   }
}

export default createContainer(() => {

   const handleUser = Meteor.subscribe("pub_myself");
   let currentUser = null;
   let ini_movies = null;
   let is_next = false;
   if (handleUser.ready()) {
      
      currentUser = Meteor.user();
      
      
      if (currentUser.ini_movies[0]) {
         
         
         ini_movies = currentUser.ini_movies[0];
      }else {
         
         is_next = true
      }

   }

   return {
      currentUser,
      ini_movies,
      is_next
   };
}, RateMovies);