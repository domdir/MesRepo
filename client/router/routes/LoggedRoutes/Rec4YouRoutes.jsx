/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */


import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesPath, routesParam, routesName, titleNames } from '../../router';
import Rec4YouWrapper from '/client/ui/wrappers/Rec4YouWrapper.jsx'
import React, { Component } from 'react'
import {triggers} from '/client/router/_triggers/Triggers'


FlowRouter.route( routesPath.REC_ROUTE, {

   triggersEnter: [triggers.mustBeLogged],

   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <Rec4YouWrapper />
         )
      } )
   }
} );