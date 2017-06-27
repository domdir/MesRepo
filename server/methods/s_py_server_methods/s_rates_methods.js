/**
 * Created with ♥ by giangi
 */

import { Meteor } from 'meteor/meteor';

import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

const base_server_url = 'http://localhost:8052/';

Meteor.methods( {


   save_rec_rate: function ( movie_id, rate, rec_type, predicted_rate, start_date, reported ) {


      const userId = this.userId;
      const endDate = new Date();
      const deltaInSeconds = (endDate - start_date) / 1000;
      Meteor.http.call( "POST", `${base_server_url}/save_rate`, {
         data: {
            "time_stamp": new Date().getTime(),
            "seen_by": userId,
            "imdb_id": movie_id,
            "rate": rate,
            "reported": reported,
            "rec_type": rec_type,
            "predicted_rate": predicted_rate,
            "time_watched": deltaInSeconds
         }
      } );

      /*Meteor.users.update(
        {
           _id: userId
        },
        {
           $pull: { rec_movies: { IMDB_ID: movie_id } }
        }
      );*/
      return true
   },


   save_ini_rate: function ( movie_id, rate, start_date,reported, rec_type="NONE" ) {

      const userId = this.userId;
      let endDate = new Date();
      endDate.getDate();
      const deltaInSeconds = (endDate - start_date) / 1000;

      Meteor.http.call( "POST", 'http://localhost:8052/save_rate', {
         data: {
            "time_stamp": start_date,
            "seen_by": userId,
            "imdb_id": movie_id,
            "rate": rate,
            "reported": reported,
            "rec_type": rec_type,
            "predicted_rate": -1,
            "time_watched": deltaInSeconds,

         }
      } );


      Meteor.users.update(
        {
           _id: userId
        },
        {
           $pull: { ini_movies: { IMDB_ID: movie_id } }
        }
      );
      return true
   },

   s_get_trailer_rated_by_me: function ( limit ) {


      Future = Npm.require( 'fibers/future' );
      var myFuture = new Future();
      let base = "http://localhost:8052/";

      Meteor.http.call( "GET",
        `${base}/movies_seen_by?user_id=${this.userId}&limit=${limit}&show_skipped=0`, ( error, result ) => {
           if (error) {
              myFuture.throw( "could not contact the server" );
           } else {
              myFuture.return( result.data );
           }

        } );
      try {
         let data = myFuture.wait();
         const movies = [];
         for (let key in data) {
            if (data.hasOwnProperty( key )) {
               movies.push( data[key] )
            }
         }
         return movies;
      }

      catch (err) {

         throwError( errors.ERROR_INTERNAL_SERVER, err )
      }
   }

} );