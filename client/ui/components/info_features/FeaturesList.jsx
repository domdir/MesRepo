/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';

export default class FeaturesList extends Component {
   constructor( props ) {
      super( props );

      this.state = {
         featureSelected: null
      };
   }

   onClickFeature( key ) {


      if (this.state.featureSelected == key) {
         this.setState( {
            featureSelected: null

         } );
         this.props.removeFeature( this.props.f_id )
      }
      else {
         this.setState( {
            featureSelected: key
         } );
         this.props.addFeature( this.props.f_id, key )

      }
   }

   renderFeatureBlock() {
      let f_list = [];
      for (var key in features) {
         if (features.hasOwnProperty( key )) {
            f_list.push( features[key] )
         }
      }

      return f_list.map( ( f, i )=> {

         let className = "button_value_feature" + f.className;
         if (this.state.featureSelected == f.id) {
            className += " selected"
         }
         return <button
           onClick={this.onClickFeature.bind(this,f.id)}
           className={className}>{f.text}</button>
      } )
   }

   render() {


      return (
        <ul><img className="iconInfoMovies" src={this.props.img_src}
                 title={this.props.f_desc} />
           {this.renderFeatureBlock()}
        </ul>
      )
   }
}


const features = {
   0: { "id": "VERY_LOW", "text": "very low", "className": " c_vl", "classNameSel": "c_vl_sel" },
   1: { "id": "LOW", "text": "low", "className": " c_l", "classNameSel": "c_l_sel" },
   2: { "id": "MEDIUM", "text": "medium", "className": " c_m", "classNameSel": "c_m_sel" },
   3: { "id": "HIGH", "text": "high", "className": " c_h", "classNameSel": "c_h_sel" },
   4: { "id": "VERY_HIGH", "text": "very high", "className": " c_vh", "classNameSel": "c_vh_sel" }

};

