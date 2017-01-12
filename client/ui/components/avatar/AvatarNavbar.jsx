/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';

export default class AvatarNavbar extends Component {

   constructor( props ) {
      super( props );

      this.state = {};
   }

   render() {
      return (

        <li>
           <img className="nav_avatar" src={this.props.img_src} />
           {/*<div className="dropdown">
            <div className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="true">

            </div>*/}
           {/*<ul className="dropdown-menu" id="d_nav" aria-labelledby="dropdownMenu1">
            <li>
            <a>Nome</a>
            <a>Email</a>
            <a>Logout</a>
            </li>
            </ul>*/}
        </li>

      )
   }
}