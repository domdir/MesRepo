import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesPath, routesParam, routesName, titleNames } from '../../router';
import ExploreTrailerWrapper from '/client/ui/wrappers/ExploreTrailersWrapper.jsx'
import DemWrapper from '/client/ui/wrappers/DemWrapper.jsx'
import React, { Component } from 'react'
import {triggers} from '/client/router/_triggers/Triggers'


FlowRouter.route( routesPath.DEM_ROUTE, {

   triggersEnter: [triggers.mustBeLogged],
 
   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <DemWrapper/>
         )
      } )
   }
} );