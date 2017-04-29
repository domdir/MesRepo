import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesPath, routesParam, routesName, titleNames } from '../../router';
import ExploreTrailerWrapper from '/client/ui/wrappers/ExploreTrailersWrapper.jsx'
import ProfileDescriptorWrapper from '/client/ui/wrappers/ProfileDescriptorWrapper.jsx'
import PersQuestWrapper from '/client/ui/wrappers/PersQuestWrapper.jsx'
import CatalogWrapper from '/client/ui/wrappers/CatalogWrapper.jsx'
import ChooseAWayWrapper from '/client/ui/wrappers/ChooseAWayWrapper.jsx'
import React, { Component } from 'react'
import {triggers} from '/client/router/_triggers/Triggers'


FlowRouter.route( routesPath.PERSONALITY_QUEST_ROUTE, {

   triggersEnter: [triggers.mustBeLogged],
 
   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <PersQuestWrapper/>
         )
      } )
   }
} );
FlowRouter.route( routesPath.CATALOG, {

   triggersEnter: [triggers.mustBeLogged],
 
   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <CatalogWrapper/>
         )
      } )
   }
} );

FlowRouter.route( "/profile_descriptor", {

   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <ProfileDescriptorWrapper />
         )
      } )
   }
} );