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
import DemographicPage from '/client/ui/pages/DemographicPage/DemographicPage.jsx';
import Catalog from '/client/ui/pages/PersonalityPage/Catalog.jsx'
import PersonalityQuestionnaire from '/client/ui/pages/PersonalityPage/PersonalityQuestionnaire.jsx'
import {routesParam} from '/client/router/router.js'

class IniWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }


   renderCurrentStep() {
	   var sectionStyle = {
		width: "100%",
		height: "400px",
		backgroundImage: "url(/images/home_page.jpg)"
		};

      switch (this.props.ini_step) {
		 case "demographic":
			return (<div className="wrapper">
			<video autoPlay loop poster="/img/bg-init.jpg" id="bgvid">
			<source src="/video/MES_video.mp4" type="video/mp4" />
			</video>
			<DemographicPage/>
			</div>);
			break;
			
		 case "choose_from_catalog":
			return (<div style={ sectionStyle }>
			<Catalog/>
			</div>);
			break;
			
		case "personality_questionnaire":
			return (<PersonalityQuestionnaire/>);
			break;
			
         case "0":
            return (<div className="ini-bg"><ChooseOneGenres /></div>);
            break;

         case "1":
            return (<div className="ini-bg"><ChooseMovieContainer /></div>);
            break;

         case "2":

            return (<div className="ini-bg"><RateMovieContainer /></div>);
            break;

         case "3":
            return (
              <div className="ini-bg"><RecQuestionnaireContainer /></div>);
            break;
         case "4":
            return (<div className="ini-bg"><GetRecContainer /></div>);
            break;

         case "5":
            scroll(0, 0);
            return (<div className="ini-bg"><EndIni /></div>);
            break;

         default:


            break;
      }
   }


   render() {
      return (
        <div >
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