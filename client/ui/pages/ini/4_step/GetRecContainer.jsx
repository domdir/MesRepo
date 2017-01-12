/*
 *created with ♥
 */

import React, { Component } from 'react'
import ExplanationRec from './ExplanationRec.jsx';
import  GetRecommendation from './SigleRec.jsx';
import { createContainer } from 'meteor/react-meteor-data';


export default class GetRecommendationContainer extends React.Component {
   constructor( props ) {
      super( props );

      this.state = {
         rec_step: 0

      };
   }

   componentDidMount() {
      Meteor.call("s_get_n_feature_rec", 5, (err,res)=>{
         
      });

   }

   nextStep() {


      this.setState( {
         rec_step: this.state.rec_step + 1
      } )
   }

   renderCurrentStep() {
      if (this.state.rec_step == 0) {
         return <ExplanationRec
           onNext={this.nextStep.bind(this)} />
      } else {
         return <GetRecommendation />
      }
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
        <div>
           {this.renderCurrentStep()}
        </div>
      )
   }
}

export default createContainer(() => {

   const handleUser = Meteor.subscribe("pub_myself");
   let currentUser = null;
   if (handleUser.ready()) {
      currentUser = Meteor.user();
   }

   return {
      currentUser
   };
}, GetRecommendationContainer);
