/*
 *created with ♥ by Gianluca Chiap
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesPath, routesParam, routesName, titleNames } from '../../router';
import ProfileWrapper from '/client/ui/wrappers/ProfileWrapper.jsx'
import React, { Component } from 'react'
import {triggers} from '/client/router/_triggers/Triggers'

const profileRoutes = FlowRouter.group( {
   prefix: routesPath.PROFILE_GROUP_ROUTE,
   name: routesName.PROFILE_GROUP_ROUTE_NAME,
   triggersEnter: [triggers.mustBeLogged]
} );


profileRoutes.route( routesPath.INDEX, {

   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <ProfileWrapper />
         )
      } )
   }
} );