import React, {Component} from 'react'
import {routesPath, routesParam} from '/client/router/router';
import SevenStars from '/client/ui/components/rate/SevenStars.jsx'
import questions from '/client/ui/components/questions/questions.jsx'


export default class PersonalityPage extends React.Component {
	constructor(props) {
        super(props);
		this.state = {
        };
    }
	metodo() {
		FlowRouter.go(routesPath.INI_BASE_ROUTE + routesParam.INI_STEP_0);
    }
render() {
        return (
		<div className="row" id="spacerow">
               
                    <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}><h1>
					Personality Questionnaire
                    </h1>
					<h2>How much are you...</h2></span>
					<img src="http://vitale6.simply-webspace.it/wp-content/uploads/2015/03/personalit%C3%A0-definizione.jpg" height="250" width="250"/>
                    <div>
					<span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>
					<h1>Extraverted - Enthusiastic</h1></span>
					<div>
                            <SevenStars onHandleVote={this.metodo} rate_title=""/>
                        </div>
                </div>
            </div>
		)
		
}
};