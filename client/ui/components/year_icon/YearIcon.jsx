/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';

export default class YearIcon extends Component {

   constructor(props) {
      super(props);

   }

   onHandleYearClick(){
      if(this.props.is_selected){
         this.props.onYearRemove(this.props.year)
      }else {
         this.props.onYearAdd(this.props.year)
      }
   }
   
   render() {
      let className="time_Button";

      if(FlowRouter.current().route.path=="/explore"){
         className+=" time_Button_s"
      }
      
      if(this.props.is_selected){
         className+=" selected"
      }
      return (
        <li>
           <button className={className} onClick={this.onHandleYearClick.bind(this)}>{this.props.year}</button>
        </li>
      )
   }
}

