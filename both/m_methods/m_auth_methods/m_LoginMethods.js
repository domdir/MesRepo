import { throwError } from '/both/errors/ErrorManager';
import { errors } from '/both/errors/ErrorList';

Meteor.methods( {
   /**
    * @summary method used to check the integrity and validity of the email in the login phase. First of all check for the empty string,
    after that use a built in checker to sanitize the input and test it against a well known regex to check
    the email structure. If the string pass the first check (that is executed both on the client and the server)
    the check proceed to the server only. So the basic idea is to do an incremental check to minimize the call to
    the server and the db access
    * @param emailToCheck
    */

   m_check_mail_is_valid_login: function ( emailToCheck ) {
      if (!emailToCheck) {
         throwError( errors.ERROR_EMAIL_NOT_VALID, "Insert an email" )
      } else {
         try {
            check( emailToCheck, email_check );
         } catch (e) {
            throwError( errors.ERROR_EMAIL_NOT_VALID, "Email not valid" )
         }
         if (Meteor.isServer) {
            checkMailLoginOnServer( emailToCheck );
         }
      }
   }
} );