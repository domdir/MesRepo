/*
 *created with ♥ by Gianluca Chiap
 */

/**
 Called when a user is created. It adds some info needed for the application. Moreover insert the new event
 in the of and send an email (both this action are deferred, see their implementation for more info)
 */
Accounts.onCreateUser( function( options, user ) {
    check( options.profile, String );
    user.user_name = options.profile;
    user.is_auth = false;
    user.is_ini = false;
    user.ini_step = 0;
    user.ini_movies = [];
    user.avatar_id = 1;
    user.fav_genres = [];
    user.rec_movies = [];

    user.tag_rec = null;
    user.genre_rec = null;
    user.feature_rec = null;

    user.dateOfBirth = null;
    user.gender = null;
    user.nationality = null;
    user.twitter = null;
    user.fb = null;
    user.instagram = null;

    return user;
} );
