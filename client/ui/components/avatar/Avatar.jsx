/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';

export default class Avatar extends Component {

   constructor( props ) {
      super( props );

      this.state = {};
   }

   onAvatarClick() {
      if (this.props.avatar_id) {

         Meteor.call( "s_set_avatar", this.props.avatar_id )
      }
   }

   render() {
      let className = "mask_avatar";
      if (this.props.is_selected) {
         className += " selected"
      }

      return (
        <li>
           <div className={className} onClick={this.onAvatarClick.bind(this)}>
              <img src={this.props.img_src} />
           </div>
        </li>
      )
   }
}