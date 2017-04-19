import React, { Component } from 'react';
import PersonalityPage from '/client/ui/pages/PersonalityPage/PersonalityPage.jsx'
import AuthTitle from '/client/ui/wrappers/auth_wrapper/AuthTitle.jsx';
import {routesParam} from '/client/router/router.js'

export default class PersonalityWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
    const firstWord = this.props.auth_case ==routesParam.LOGIN ? "THE" : "THE";
    const secondWord = this.props.auth_case == routesParam.LOGIN ? "MOVIES" : "MOVIES";
    
      return (      
        <div className="wrapper">
        <AuthTitle firstWord={firstWord} secondWord={secondWord} />
           <PersonalityPage/>
        </div>
      )
   }
}