/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';

export default class FeatureRange extends Component {

   constructor( props ) {
      super( props );

      this.state = {};
   }

   renderFeatures() {
      return features.map( f=> {
         
         return (
           <button onClick={this.selectFeature.bind(this)} className="button_value_feature c_vl">very low</button>)
      } )
   }

   render() {
      return (
        <div></div>
      )
   }
}

