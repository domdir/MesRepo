import React, { Component } from 'react';
import Webcam from '/client/ui/pages/WebcamPage/Webcam.jsx'
import {routesParam} from '/client/router/router.js'

export default class WebcamWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (      
        <div className="wrapper">
           <Webcam/>
        </div>
      )
   }
};