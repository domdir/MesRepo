/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';
import HomePage from '/client/ui/pages/HomePage/HomePage.jsx'
export default class HomeWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (
        <div className="wrapper">
           <HomePage />
        </div>
      )
   }
}