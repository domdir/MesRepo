import React, {Component} from 'react'
import {routesPath, routesParam} from '/client/router/router';
import SevenStars from '/client/ui/components/rate/SevenStars.jsx'
import Questions from '/client/ui/components/questions/Questions.jsx'


export default class PersonalityPage extends React.Component {
	constructor(props) {
        super(props);
		this.state = {
			questionId: Number(1)
        };
    }
    
    componentDidUpdate(){
    this.refs.player.load();
    }
    
	metodo() {
		if (this.state.questionId<10){
		this.setState((prevState) => ({
		questionId: prevState.questionId + 1
		}));
		}else{
		FlowRouter.go(routesPath.INI_BASE_ROUTE + routesParam.INI_STEP_0);
		}
    }
render() {
	const movieBackgrounds=[
	"/video/personality/1.mp4",
	"/video/personality/2.mp4",
	"/video/personality/3.mp4",
	"/video/personality/4.mp4",
	"/video/personality/5.mp4",
	"/video/personality/6.mp4",
	"/video/personality/7.mp4",
	"/video/personality/8.mp4",
	"/video/personality/9.mp4",
	"/video/personality/10.mp4"
	];
        return (
		<div className="row" id="spacerow">
		<video autoPlay muted="true" loop poster="/img/bg-init.jpg" id="bgvid" ref="player">
          <source src={movieBackgrounds[this.state.questionId-1]} type="video/mp4" />
        </video>
                    <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)',
                           
                        }}><h1>
					Personality Questionnaire
                    </h1></span>
                    <div className="formauthLarge">
					<span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}><h2>
                    How much are you...
                    </h2></span>
					<Questions questionId={this.state.questionId}/>
                    <SevenStars onHandleVote={this.metodo.bind(this)} rate_title=""/>
                    </div>
                   
            </div>
		)
		
}
};
