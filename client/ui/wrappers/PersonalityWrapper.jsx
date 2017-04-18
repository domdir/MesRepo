import React, { Component } from 'react';
import PersonalityPage from '/client/ui/pages/PersonalityPage/PersonalityPage.jsx'
export default class PersonalityWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (
        <div className="wrapper">
           <PersonalityPage/>
        </div>
      )
   }
}