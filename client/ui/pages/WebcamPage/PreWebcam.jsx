import React, {Component} from 'react'
import {routesPath, routesParam} from '/client/router/router';

export default class PreWebcam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    goToWebcam() {
       Meteor.call("s_set_ini_step", "interaction_with_the_system", err=> {
            if (!err) {
               FlowRouter.setParams({ini_step: routesParam.WEBCAM});
            }
         })
    }
    render() {
    
        return (
           <div className="pageCenter">
            <div className="row" id="spacerow">
			<div className="formauth" style={{width: "50%"}}>
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
				 <input className="btn btn-default" type="submit" onClick={this.goToWebcam.bind(this)}  value="Continue"/>
				 </div>
                </div>
				</div>
        </div>
            )
    }
};