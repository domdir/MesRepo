/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component, ReactDom } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import RateMovieContainer from '/client/ui/pages/ini/2_step/RateMovieContainer.jsx'
import GetRecContainer from '/client/ui/pages/ini/4_step/GetRecContainer.jsx'
import ChooseMovieContainer from '/client/ui/pages/ini/1_step/ChooseMovieContainer.jsx'
import EndIni from '/client/ui/pages/ini/5_step/EndIni.jsx'
import RecQuestionnaireContainer from '/client/ui/pages/ini/3_step/RecQuestionnaireContainer.jsx'
import ChooseOneGenres from '/client/ui/pages/ini/0_step/ChooseOneGenre.jsx'

class IniWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }


   renderCurrentStep() {

      switch (this.props.ini_step) {
         case "0":
            return (<ChooseOneGenres />);
            break;

         case "1":
            return (<ChooseMovieContainer />);
            break;

         case "2":

            return (<RateMovieContainer />);
            break;

         case "3":
            return (
              <RecQuestionnaireContainer />);
            break;
         case "4":
            return (<GetRecContainer />);
            break;

         case "5":
            scroll(0, 0);
            return (<EndIni />);
            break;

         default:


            break;
      }
   }


   render() {
      return (
        <div className="ini-bg">
           <div className="wrapper">
              {this.renderCurrentStep()}
           </div>
        </div>
      )
   }
}

export default createContainer(() => {
   return {};
}, IniWrapper);