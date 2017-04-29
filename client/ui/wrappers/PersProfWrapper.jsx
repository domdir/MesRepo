import React, { Component } from 'react';
import PersonalityProfile from '/client/ui/pages/PersonalityPage/PersonalityProfile.jsx'
import {routesParam} from '/client/router/router.js'

export default class PersonalityProfWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (      
        <div className="wrapper">
           <PersonalityProfile/>
        </div>
      )
   }
};