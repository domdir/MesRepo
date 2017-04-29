import React, { Component } from 'react';
import preWebcam from '/client/ui/pages/WebcamPage/preWebcam.jsx'
import {routesParam} from '/client/router/router.js'


var sectionStyle = {
  width: "120%",
  height: "400px",
  backgroundImage: "url(/images/webcam1.jpg)"
};
export default class preWebcamWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
      return (   
        <div className="wrapper" style={ sectionStyle }>
           <div className="pageCenter">
            <div className="row" id="spacerow">
			<div className="formauth">
			<h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>What kind of moovie would you like to see in this moment?</span>
                    </h1>
			<h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>Show the cover of a moovie in the following page</span>
                    </h1>
				<div style={{position: "relative", top:"10px"}}>
				 <input className="btn btn-default" type="submit"  value="Continue"/>
				 </div>
                </div>
				</div>
        </div>
		</div>
      )
   }
};