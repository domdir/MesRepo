import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesPath, routesParam, routesName, titleNames } from '../../router';
import WebcamWrapper from '/client/ui/wrappers/WebcamWrapper.jsx'
import PreWebcamWrapper from '/client/ui/wrappers/PreWebcamWrapper.jsx'
import React, { Component } from 'react'
import {triggers} from '/client/router/_triggers/Triggers'


FlowRouter.route( routesPath.WEBCAM, {

   triggersEnter: [triggers.mustBeLogged],
 
   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <WebcamWrapper/>
         )
      } )
   }
} );
FlowRouter.route( routesPath.PREWEBCAM, {

   triggersEnter: [triggers.mustBeLogged],
 
   action: function () {

      mount( AppLayout, {
         main_content: () => (
           <PreWebcamWrapper/>
         )
      } )
   }
} );