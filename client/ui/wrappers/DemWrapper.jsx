import React, { Component } from 'react';
import DemographicPage from '/client/ui/pages/DemographicPage/DemographicPage.jsx';
import {routesParam} from '/client/router/router.js'

export default class DemWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
   
  
      return (
        <div className="wrapper">
        <video autoPlay loop poster="/img/bg-init.jpg" id="bgvid">
          <source src="/video/MES_video.mp4" type="video/mp4" />
        </video>
           <DemographicPage/>
        </div>
      )
   }
}