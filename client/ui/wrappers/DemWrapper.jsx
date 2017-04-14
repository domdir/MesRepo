import React, { Component } from 'react';
import DemographicPage from '/client/ui/pages/DemographicPage/DemographicPage.jsx'
export default class DemWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (
        <div className="wrapper">
           <DemographicPage/>
        </div>
      )
   }
}