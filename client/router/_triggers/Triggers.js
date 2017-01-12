/*
 *created with ♥ by Gianluca Chiap
 */

export const triggers = {

   mustBeLogged: function mustBeLogged( context, redirect ) {


      if (!Meteor.userId()) {
         redirect( "/auth/login" )
      }
   },
   

   mustNotBeLogged: function mustNoBeLogged( context, redirect ) {

      if (Meteor.userId()) {
         redirect( "/profile" )
      }
   }

};

Tracker.autorun( function () {

   if (!Meteor.userId()) {
      //FlowRouter.go('/auth/login')
   }
} );