/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';
import LoginPage from '/client/ui/pages/auth_pages/login/LoginPage.jsx'
import SignUpPage from '/client/ui/pages/auth_pages/signup/SignUpPage.jsx'
import {routesParam} from '/client/router/router.js'
import AuthTitle from './AuthTitle.jsx'

export default class AuthWrapper extends Component {
  
  chooseAuthMethod() {
    if (this.props.auth_case == routesParam.LOGIN) {
      return <LoginPage />
    } else return <SignUpPage />
  }

  render() {
    
    const firstWord = this.props.auth_case ==routesParam.LOGIN ? "THE" : "THE";
    const secondWord = this.props.auth_case == routesParam.LOGIN ? "MOVIES" : "MOVIES";
    return (
      <div className="wrapper">
        <video autoPlay loop poster="/img/bg-init.jpg" id="bgvid">
          <source src="/video/MES_video.mp4" type="video/mp4" />
        </video>
        <AuthTitle firstWord={firstWord} secondWord={secondWord} />
        {this.chooseAuthMethod()}
      </div>
    )
  }
}

