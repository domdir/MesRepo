/**
 * Created with ♥ by giangi
 */


import {errors} from '/both/errors/ErrorList';
import {throwError} from '/both/errors/ErrorManager';

/**
 @summary check if the email already exist (namely if exist another user with the same email)
 @param {String} email the email to be checked
 @returns {boolean} true if exist, false otherwise
 */

checksIfMailExists = function (email) {
    return !!Accounts.findUserByEmail(email);
};


/**
 * check if there exist a user with this email
 * @param email the email used for the check
 * @returns {boolean} true if the user exist, throw an exception otherwise
 */
checkMailLoginOnServer = function (email) {
    let user=Accounts.findUserByEmail(email);
    if (!user) {
      throwError(errors.ERROR_USER_NOT_EXIST, "The user does not exist");
    } else {
        //if (!user.is_auth) {
        //    throwError(errors.ERROR_USER_NOT_AUTH, "the user is not authorized");
        //} else {
            return true;
        //}
    }
};


