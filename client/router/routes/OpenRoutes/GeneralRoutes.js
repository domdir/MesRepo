/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react'

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesName, routesPath, routesParam, titleNames } from '../../router';

FlowRouter.notFound = {
   name: routesName.NOT_FOUND_ROUTE_NAME,
   action() {
      mount( AppLayout, {
         main_content: () => (
           <NotFoundWrapper />
         )
      } )
   }

};


FlowRouter.route( routesPath.LOGOUT_ROUTE, {
   name: routesName.LOGOUT_ROUTE_NAME,
   triggersEnter: [function () {
	   /*Meteor.call( "sendTime" )*/
      Meteor.logout( err=> {
         if (!err) {
            FlowRouter.go( routesPath.AUTH_BASE_ROUTE + "/" + routesParam.LOGIN );
         }
      } );
   }]
} );


