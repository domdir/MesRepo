/**
 * Created with ♥ by giangi
 */


import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { routesName, routesPath, routesParam, titleNames } from '../../router';
import IniWrapper from '/client/ui/wrappers/IniWrapper.jsx'

import React, { Component } from 'react'
import { triggers } from '/client/router/_triggers/Triggers'


const iniRoutes = FlowRouter.group( {
   prefix: routesPath.INI_BASE_ROUTE,
   name: routesName.INI_GROUP_NAME,
   triggersEnter: [triggers.mustBeLogged]

} );

iniRoutes.route( routesPath.INDEX, {

   action: function () {
      mount( AppLayout, {
         main_content: () => (
           <IniWrapper ini_step={routesParam.INI_STEP_0} />
         )
      } )
   }
} );


iniRoutes.route( "/:ini_step", {

   action: function ( params ) {

      mount( AppLayout, {
         main_content: () => (
           <IniWrapper ini_step={params.ini_step} />
         )
      } )
   }
} );

