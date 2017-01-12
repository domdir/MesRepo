/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React from 'react';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import AppLayout from '/client/AppLayout.jsx';
import PresentationWrapper  from '/client/ui/wrappers/PresentationWrapper.jsx'
import AuthWrapper from '/client/ui/wrappers/auth_wrapper/AuthWrapper.jsx'
import NotFoundWrapper from '/client/ui/wrappers/NotFoundWrapper.jsx'
import {triggers} from '/client/router/_triggers/Triggers'


import { routesPath, routesParam, routesName, titleNames } from '../../router';

//PRESENTATION
FlowRouter.route( routesPath.INDEX, {
   action (){
      mount( AppLayout, {
         main_content: () => (
           <PresentationWrapper />
         )
      } )
   }
} );


// AUTH


const authRoutes = FlowRouter.group( {
   prefix: routesPath.AUTH_BASE_ROUTE,
   name: routesName.AUTH_BASE_ROUTE_NAME,
   triggersEnter: [triggers.mustNotBeLogged]
} );

authRoutes.route( routesPath.INDEX, {
   action: function () {
      FlowRouter.go( routesPath.AUTH_BASE_ROUTE + "/" + routesParam.LOGIN )
   }
} );



authRoutes.route( "/:auth_case", {
   /* triggersEnter: [ function (context, redirect) {
    let auth_case = context.params.auth_case;
    if (auth_case !== LOGIN && auth_case !== SIGNUP) {
    redirect(NOT_FOUND_ROUTE_NAME);
    }
    } ],*/
   action: function ( params ) {

      mount( AppLayout, {
         main_content: () => (
           <AuthWrapper auth_case={params.auth_case} />
         )
      } )
   }
} );

