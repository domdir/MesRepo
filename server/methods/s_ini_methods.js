/**
 * Created with ♥ by giangi
 */

import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

/*function pushCurrent(vector,element){
	var vectorToReturn=vector
	if(!vectorToReturn){
		vectorToReturn=[]
	}
	vectorToReturn.push(element)
	return vectorToReturn
}*/
Meteor.methods({
	sendTime: function(){
		dic=Meteor.users.find(
	  		      {
	    		         _id: this.userId
	    		      },
	    		   {
	    		    	  'time_page':1
	    		      }
	    		    ).fetch()[0]["time_page"];
		Meteor.http.call("POST", 'http://localhost:8052/load_page', {
		    data: {
		  	 "user_id": this.userId,
		     "pageTime": dic
		    }
		 }, (err, res)=> {

		    if (err) {
		    	console.log(err)
		    	console.log("Error to call server")
		    }
		 }
		);
	},
	update_page: function(step,pageTime){
		if (!this.userId) {
	         return;
	      }
	      dic=Meteor.users.find(
	  		      {
	    		         _id: this.userId
	    		      },
	    		   {
	    		    	  'time_page':1
	    		      }
	    		    ).fetch()[0]["time_page"];
	      if(!dic){
	    	  dic={}
	      }
	      dic[step]=pageTime
	      Meteor.users.update(
	  		      {
	  		         _id: this.userId
	  		      },
	  		      {
	  		         $set: {
	  		        	 time_page: dic
	  		         }
	  		      }
	  		    );
	      	console.log("time: ",dic)
	},
   s_set_ini_step: function (ini_step, pageTime) {
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
      Meteor.http.call("POST", 'http://localhost:8052/save_genres_liked', {
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

   s_save_questions_and_clean_rec: function (param) {
      
	  questions=param[0]
	  list_rec=param[1]
	  list_timestamps=param[2]
      const questionsArray = [];
      for (var key in questions) {
         if (questions.hasOwnProperty(key)) {
            questionsArray.push(questions[key]);
         }
      }
      Meteor.http.call("POST", 'http://localhost:8052/save_quest', {
           data: {
              "user_id": this.userId,
              "questions": questionsArray,
              "recs": list_rec,
              "timestamps": list_timestamps
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
              feature_rec:[],
              audio_rec:null
           }
        }
      );
   },


  

});