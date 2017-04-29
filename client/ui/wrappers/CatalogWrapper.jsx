import React, { Component } from 'react';
import Catalog from '/client/ui/pages/PersonalityPage/Catalog.jsx'
import {routesParam} from '/client/router/router.js'

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "url(/images/home_page.jpg)"
};

export default class CatalogWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
    return (      
        <div className="wrapper" style={ sectionStyle }>
           <Catalog/>
        </div>
      )
   }
}