/**
 * Created with ♥ by giangi
 */
/*
 The methods responsible for the registration of a new user
 */

import { throwError } from '/both/errors/ErrorManager';
import { errors } from '/both/errors/ErrorList';

Meteor.methods( {
   /**
    * @summary Used to check the integrity and validity of the email in the registration phase.
    First of all check for the empty string,
    after that use a built in checker to sanitize the input and test it against a well known regex to check
    the email structure. If the string pass the first check (that is executed both on the client and the server)
    the check proceed to the server only. So the basic idea is to do an incremental check to minimize the call to
    the server and the db access
    * @param email the email to be checked
    */
   m_check_email_can_be_used: function ( email ) {
      //both client and server
      if (!email) {

         throwError( errors.ERROR_EMAIL_NOT_VALID, "Insert an Email" );
      } else {
         try {
            check( email, email_check );
         } catch (e) {
            throwError( errors.ERROR_EMAIL_NOT_VALID, "Email is not valid" );
         }
      }
      //only the server
      if (Meteor.isServer) {
         res = checksIfMailExists( email );
         if (res) {
            throwError( errors.ERROR_EMAIL_NOT_VALID, "Email is already in use" );
         }
      }
   },


   /**
    * @summary Check if the username is a not null string
    * @param userName
    * @returns {boolean}
    */
   m_check_userName: function ( userName ) {
      if (!userName) {
         throwError( errors.ERROR_USER_NAME_NOT_VALID, "Insert a username" )

      } else {
         try {
            check( userName, String );
            return true;
         } catch (e) {
            throwError( errors.ERROR_USER_NAME_NOT_VALID, "User name not valid" )
         }
      }
   }
} );
