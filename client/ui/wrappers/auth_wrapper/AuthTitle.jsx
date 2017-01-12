/*
 *created with ♥ by Gianluca Chiap
 */

import React from 'react';

export default AuthTitle = ({firstWord,secondWord})=>(

  <div className="bigcontainer">
    <div className="jumbotron">
      <h1 className="text-center">
        {firstWord}
        <span style={{color: '#91f98d'}}> B</span>
        <span style={{color: '#f3d93c'}}>E</span>
        <span style={{color: '#FF5041'}}>S</span>
        <span style={{color: '#26A4DA'}}>T </span>
        {secondWord} FOR
        <span style={{color: 'rgba(38, 198, 218, 0.9)'}}> YOU</span>
      </h1>
    </div>
  </div>
         
);