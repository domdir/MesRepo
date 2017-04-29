import React, {Component} from 'react'
import {routesPath, routesParam} from '/client/router/router';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    goToCatalog() {
       FlowRouter.go(routesPath.INI_BASE_ROUTE + routesParam.INI_STEP_0);
    }
	goToWebcam() {
       FlowRouter.go(routesPath.INI_BASE_ROUTE + routesParam.INI_STEP_0);
    }
    render() {
    
        return (
            <div className="verticalCenter">
				<figure className="lineCenter">
                <img width="500" height="350" src={'/images/catalog.png'} onclick={this.goToCatalog.bind(this)} />
				<figcaption style={{color: "white", width: "200px"}}>Catalog of moovies</figcaption>
				</figure>
				<div></div>
				<div></div>
				<div></div>
				<figure className="lineCenter">
				<img width="500" height="350" src={'/images/webcam.jpg'} onclick={this.goToWebcam.bind(this)} />
				<figcaption style={{color: "white", width: "200px"}}>Interaction with the system</figcaption>
				</figure>
				
                </div>
            )
    }
};