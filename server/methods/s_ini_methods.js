/**
 * Created with ♥ by giangi
 */

import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

Meteor.methods({

   s_set_ini_step: function (ini_step) {

      if (!this.userId) {
         return;
      }

      Meteor.users.update(
        {
           _id: this.userId
        },
        {
           $set: {
              ini_step: ini_step
           }
        }
      )
   },


   s_save_genres: function (genres) {

      const userId = this.userId;

      Meteor.users.update(
        {
           _id: userId
        },
        {
           $set: {fav_genres: genres}
        }
      );
      Meteor.http.call("POST", 'http://recmusicapiopenshift-obscuretest.rhcloud.com/save_genres_liked', {
           data: {
              "user_id": userId,
              "genres_liked": genres
           }
        }, (err, res)=> {

           if (err) {

           }
        }
      );
   },

   s_save_movies_chosen: function (movies) {

      if (this.userId) {
         Meteor.users.update(
           {
              _id: this.userId
           },
           {
              $set: {
                 ini_movies: movies
              }
           }
         );
         return true;
      }
   },

   initialize_user: function () {

      Meteor.users.update(
        {
           _id: this.userId
        },
        {
           $set: {
              is_ini: true
           }
        }
      );

   },

   s_save_questions_and_clean_rec: function (questions) {
      
      
      const questionsArray = [];
      for (var key in questions) {
         if (questions.hasOwnProperty(key)) {
            questionsArray.push(questions[key]);
         }
      }
      Meteor.http.call("POST", 'http://recmusicapiopenshift-obscuretest.rhcloud.com/save_quest', {
           data: {
              "user_id": this.userId,
              "questions": questionsArray
           }
        }
      );

      

      Meteor.users.update(
        {
           _id: this.userId
        },
        {
           $set: {
              tag_rec: null,
              genre_rec:null,
              feature_rec:[]
           }
        }
      );
   }

});