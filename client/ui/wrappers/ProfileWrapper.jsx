
 /*
*created with ♥ by Gianluca Chiap
*/

import React, { Component } from 'react';
import ProfilePage from '/client/ui/pages/profile_page/ProfilePage.jsx'
 
export default class ProfileWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (
        <div className="wrapper">
           <ProfilePage/>
        </div>
      )
   }
}