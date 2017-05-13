/**
 * Created with ♥ by davide anghileri
 */

import { Meteor } from 'meteor/meteor';
import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

const base_server_url = 'http://localhost:8052/';

Meteor.methods( {
	
	s_save_personality_questions: function (questions) {
	   
    Meteor.http.call("POST", 'http://localhost:8052/save_personality_questions', {
        data: {
           "user_id": this.userId,
           "questions": questions
        }
     }
   );
   
    //Modify if want to saves the response also on mongoDb
    /*Meteor.users.update(
      {
         _id: this.userId
      },
      {
         $set: {
        	 dateOfBirth : questions["dateOfBirth"],
        	 gender : questions["gender"],
        	 nationality : questions["nationality"],
         }
      }
    );*/
 }
} );