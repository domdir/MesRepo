import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesPath, routesParam, routesName, titleNames } from '../../router';
import ExploreTrailerWrapper from '/client/ui/wrappers/ExploreTrailersWrapper.jsx'
import PersonalityWrapper from '/client/ui/wrappers/PersonalityWrapper.jsx'
import React, { Component } from 'react'
import {triggers} from '/client/router/_triggers/Triggers'


FlowRouter.route( routesPath.PERSONALITY_ROUTE, {

   triggersEnter: [triggers.mustBeLogged],
 
   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <PersonalityWrapper/>
         )
      } )
   }
} );