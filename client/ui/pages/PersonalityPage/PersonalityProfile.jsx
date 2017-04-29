import React, {Component} from 'react'
import {routesPath, routesParam} from '/client/router/router';

export default class PersonalityProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    goToChoice() {
       FlowRouter.go(routesPath.CHOICE_ROUTE);
    }
    render() {
    
        return (
            <div>
                <h1 className="pageCenter">
                Personality Profile page will be added later...
                </h1>
                <div className="lineCenterAbsolute">
                <input className="btn btn-default" type="submit" onClick={this.goToChoice.bind(this)} value={"Continue"}/>
                    </div>
                </div>
            )
    }
};