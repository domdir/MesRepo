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
import WebcamPage from '/client/ui/pages/WebcamPage/WebcamPage.jsx'
import PreWebcam from '/client/ui/pages/WebcamPage/PreWebcam.jsx'
import PersonalityQuestionnaire from '/client/ui/pages/PersonalityPage/PersonalityQuestionnaire.jsx'
import {routesParam} from '/client/router/router.js'


class IniWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {
		  timeSpent: 0
	  };
   }


   renderCurrentStep() {
	   var wrapperHeight = $(".wrapper").height();
	   var sectionStyle = {
		width: "100%",
		height: "645px",
		backgroundImage: "url(/images/home_page.jpg)"
		};

      switch (this.props.ini_step) {
		 case "demographic":
			return (
			<div className="wrapper">
			
			<video autoPlay loop poster="/img/bg-init.jpg" id="bgvid">
			<source src="/video/MES_video.mp4" type="video/mp4" />
			</video>
			<DemographicPage/>
			</div>);
			break;
			
		 case "choose_from_catalog":
			return (
			<div className="overBackgroundCatalog" style={{height: wrapperHeight}} >
			<Catalog/>
			</div>);
			break;
			
		case "personality_questionnaire":
			return (<div className="row" id="spacerow">
			<video autoPlay muted="true" loop poster="/img/bg-init.jpg" id="bgvid" ref="player">
          <source src={"/video/MES_video.mp4"} type="video/mp4" />
        </video>
		<PersonalityQuestionnaire/>
		</div>);
			break;
			
		case "webcam":
			return (
			<div className="overBackgroundWebcam" style={{height: wrapperHeight}} >
			<PreWebcam/>
			</div>);
			break;
		
		case "interaction_with_the_system":
			return (
			<div className="overBackgroundInteraction" style={{height: wrapperHeight}}>
			<WebcamPage/>
			</div>);
			
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
   
componentDidMount() {
	Meteor.call('page_loaded', "ini/"+this.props.ini_step);
  }
   render() {
	   if (this.props.currentUser) {
         
         if (FlowRouter.current().params.ini_step != this.props.currentUser.ini_step) {
            
            FlowRouter.go("/ini/"+this.props.currentUser.ini_step)
         }
         if(this.props.currentUser.is_ini){
            FlowRouter.go("/profile");
         }
      }
      return (
	  <div className="wrapper">
              {this.renderCurrentStep()}
           </div>
      )
   }
}

export default createContainer(() => {
	const handleUser = Meteor.subscribe( "pub_myself" );
   let currentUser = null;
   if (handleUser.ready()) {
      currentUser = Meteor.user();
   }
   return {
	   currentUser
   };
}, IniWrapper);