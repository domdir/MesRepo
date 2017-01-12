/*
 *created with ♥ by Gianluca Chiap
 */

import React  from 'react';

export default NavBarLogo = ({to})=> {

  return (
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <a className="navbar-brand" href={to}><img id="logoMES" src={'/images/MES_logo_white.png'} /></a>
      <a className="navbar-brand" id="name_logo" href={to}> <span
        style={{fontSize: "16pt", fontFamily: "MESFont4"}}>MES   </span><span
        style={{color: '#26C6DA'}}>    PROJECT</span></a>
    </div>
  )
};