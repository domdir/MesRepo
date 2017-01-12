/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import Rec4You from '/client/ui/pages/rec4you/Rec4You.jsx'
export default class Rec4YouWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (
        <div className="wrapper">
           <Rec4You />
        </div>
      )
   }
}