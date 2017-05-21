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
var vector=[]
Meteor.methods({
	/*sendTime: function(){
		vector=Meteor.users.find(
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
		     "pageTime": vector
		    }
		 }, (err, res)=> {

		    if (err) {

		    }
		 }
		);
	},*/
   s_set_ini_step: function (ini_step, pageTime) {
/*
      if (!this.userId) {
         return;
      }
      vector=Meteor.users.find(
  		      {
    		         _id: this.userId
    		      },
    		   {
    		    	  'time_page':1
    		      }
    		    ).fetch()[0]["time_page"];
      if (!vector){
    	  vector=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
      
    	 switch (ini_step) {
		 case "demographic":
			 vector[3]=pageTime
			break;
		 case "personality_questionnaire":
			 vector[4]=pageTime
			break;
		 case "choose_from_catalog":
			 vector[5]=pageTime
			break;
			
         case "0":
        	 vector[6]=pageTime
            break;

         case "1":
        	 vector[7]=pageTime
            break;

         case "2":
        	 vector[8]=pageTime
            break;
            
         case "webcam":
        	 vector[9]=pageTime
  			break;
  			
  		case "interaction_with_the_system":
  			vector[10]=pageTime
  			break;
  			
         case "3":
        	 vector[11]=pageTime
            break;
         case "4":
        	 vector[12]=pageTime
            break;
         case "5":
        	 vector[13]=pageTime
            break;
            
         default:
            break;
      }
      Meteor.users.update(
  		      {
  		         _id: this.userId
  		      },
  		      {
  		         $set: {
  		        	 time_page: vector
  		         }
  		      }
  		    );
      	console.log(vector)*/
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

   s_save_questions_and_clean_rec: function (questions) {
      
      
      const questionsArray = [];
      for (var key in questions) {
         if (questions.hasOwnProperty(key)) {
            questionsArray.push(questions[key]);
         }
      }
      Meteor.http.call("POST", 'http://localhost:8052/save_quest', {
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
   },


  

});