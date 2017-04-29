import React, { Component } from 'react';
import Catalog from '/client/ui/pages/PersonalityPage/Catalog.jsx'
import {routesParam} from '/client/router/router.js'

export default class CatalogWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
    return (      
        <div className="wrapper">
           <ChooseAWay/>
        </div>
      )
   }
}