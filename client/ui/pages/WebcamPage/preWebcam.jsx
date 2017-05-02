import React, {Component} from 'react'
import {routesPath, routesParam} from '/client/router/router';

export default class preWebcam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    goToWebcam() {
       FlowRouter.go(routesPath.WEBCAM);
    }
    render() {
    
        return (
			<div className="pageCenter">
            <div className="row" id="spacerow">
			<h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>What kind of movie would you like to see in this moment?</span>
                    </h1>
			<h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>Show the cover of a movie in the following page</span>
                    </h1>
				<div style={{position: "relative", top:"50px"}}>
				 <input className="btn btn-default" type="submit" onClick={this.goToWebcam.bind(this)} value="Continue"/>
				 </div>
                </div>
				</div>
            )
    }
};