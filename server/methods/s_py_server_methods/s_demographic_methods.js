/**
 * Created with ♥ by davide anghileri
 */

import { Meteor } from 'meteor/meteor';
import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

const base_server_url = 'http://localhost:8052/';

Meteor.methods( {
	
s_save_dem_questions: function (questions) {
	   
    Meteor.http.call("POST", 'http://localhost:8052/save_dem_quest', {
        data: {
           "user_id": this.userId,
           "questions": questions
        }
     }
   );
   
    Meteor.users.update(
      {
         _id: this.userId
      },
      {
         $set: {
        	 dateOfBirth : questions["dateOfBirth"],
        	 gender : questions["gender"],
        	 nationality : questions["nationality"],
        	 question1 : questions["question1"],
        	 question2 : questions["question2"],
        	 twitter : questions["twitter"],
        	 fb : questions["fb"],
        	 instagram : questions["instagram"],
        	 lastfm : questions["lastfm"],
        	 spotify : questions["spotify"]

         }
      }
    );
 }
} );