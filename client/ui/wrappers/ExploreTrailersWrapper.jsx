/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';

import ExplorePage from '/client/ui/pages/explore/ExploreTrailers.jsx';

export default class ExploreTrailersWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (
        <div className="wrapper">
           <ExplorePage/>
        </div>
      )
   }
}