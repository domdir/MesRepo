
 /*
*created with ♥ by Gianluca Chiap
*/

import React, { Component } from 'react';
import ExplanationRates from './ExplanationRates.jsx'
import RateMovies from './RateMovies.jsx'
 
export default class RateMovieContainer extends Component {

   constructor(props) {
      super(props);

      this.state = {
         rate_step:0
      };
   }


   renderCurrentStep() {
      if(this.state.rate_step==0){
         return <ExplanationRates
                  onNext={this.nextStep.bind(this)}/>
      }else {
         return <RateMovies/>
      }
   }

   nextStep(){
      this.setState({
         rate_step:this.state.rate_step+1
      })
   }
   
   render() {
      return (
        <div>
           {this.renderCurrentStep()}
        </div>
      )
   }
}