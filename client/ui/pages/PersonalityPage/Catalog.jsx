import React, {Component} from 'react'
import {routesPath, routesParam} from '/client/router/router';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        date_load: null
        };
    }
	
	componentDidMount() {
	this.setState({
		date_load: (new Date).getTime()
	});
  }
    
    goToCatalog() {
		pageTime= ((new Date).getTime()-this.state.date_load)/1000
		window.scrollTo(0, 0)
       Meteor.call("s_set_ini_step", "0",pageTime, err=> {
                  if (!err) {
                     FlowRouter.setParams({ini_step: "0"});
                  }
               })
    }
    render() {
    
        return (
			<div className="pageCenter">
            <div className="row" id="spacerow">
			<h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>Let us know you even better...</span>
                    </h1>
			<h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>What are your likes in movies?</span>
                    </h1>
				<div style={{position: "relative", top:"50px"}}>
				 <input className="btn btn-default" type="submit" onClick={this.goToCatalog.bind(this)} value="Continue"/>
				 </div>
                </div>
				</div>
            )
    }
};