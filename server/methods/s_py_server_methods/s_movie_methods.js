/*
 *created with ♥ by Gianluca Chiap
 */

import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

const base_server_url = "http://localhost:8052/";

Meteor.methods({

   s_get_n_ini_movies: function (num_of_movies, genre, years_selected,except) {

      
      
      check(num_of_movies, Number);

      if (num_of_movies > 20) {
         return;
      }

      Future = Npm.require('fibers/future');
      var myFuture = new Future();
      Meteor.http.call("GET",
        `${base_server_url}/get_ini_movies?genre=${genre}&years=${years_selected}&num_of_movies=${num_of_movies}&except_movies=${except}`,
        (error, result) => {
           if (error) {

              myFuture.throw("could not contact the server");
           } else {

              myFuture.return(result.data)
           }
        });
      try {
         let data = myFuture.wait();
         const res = [];
         //JSON.parse(data);
         for (let key in data) {
            if (data.hasOwnProperty(key)) {
               res.push(data[key])
            }
         }
         
         
         

         return res;
      }
      catch (err) {
         throwError(errors.ERROR_INTERNAL_SERVER, err)
      }
   },
   
   s_get_movies:function (num_of_movies,genre,years_selected,f1,f2,f4,f6) {

      check(num_of_movies, Number);
      
      Future = Npm.require('fibers/future');
      var myFuture = new Future();
      Meteor.http.call("GET",
        `${base_server_url}/get_movies?genre=${genre}&years=${years_selected}&num_of_movies=${num_of_movies}&requested_by=${this.userId}&f1=${f1}&f2=${f2}&f4=${f4}&f6=${f6}`,
        (error, result) => {
           if (error) {

              myFuture.throw("could not contact the server");
           } else {

              myFuture.return(result.data)
           }
        });
      try {
         let data = myFuture.wait();
         const res = [];
         //JSON.parse(data);
         for (let key in data) {
            if (data.hasOwnProperty(key)) {
               res.push(data[key])
            }
         }

         return res;
      }
      catch (err) {
         throwError(errors.ERROR_INTERNAL_SERVER, err)
      }
   }
});