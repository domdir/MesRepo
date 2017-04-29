import React, { Component } from 'react';
import AuthTitle from '/client/ui/wrappers/auth_wrapper/AuthTitle.jsx';
import {routesParam} from '/client/router/router.js'

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: "url(/images/home_page.jpg)"
};

export default class ProfileDescriptorWrapper extends Component {

   constructor(props) {
      super(props);

      this.state = {};
   }

   render() {
   
    const firstWord = this.props.auth_case ==routesParam.LOGIN ? "THE" : "THE";
    const secondWord = this.props.auth_case == routesParam.LOGIN ? "MOVIES" : "MOVIES";
    
      return (
        <div className="wrapper" style={sectionStyle}>
        <div className="row" id="spacerow">
                
                    <h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>Your tastes in movies looks like</span>
                    </h1>
                    <div className="formauth" style={{color: "white"}}>
						<div className="question_div2">
             <span className="question_title" style={{marginTop:"20px"}}>Genre:</span><input type="text" value="Animation" placeholder="@TwitterName" ref="ref_question3"
                       className="form-demQuestionnaire-questions-text"/></div>
					   <input type="text" value="Adventure" placeholder="@TwitterName" ref="ref_question3"style={{marginLeft: "200px"}}
                       className="form-demQuestionnaire-questions-text"/>
					   <div className="question_div2">
             <span className="question_title" style={{marginTop:"20px"}}>Emotion:</span><input type="text" value="Exiting" placeholder="@TwitterName" ref="ref_question3"
                       className="form-demQuestionnaire-questions-text"/></div>
					   <input type="text" value="Captivating" placeholder="@TwitterName" ref="ref_question3"style={{marginLeft: "200px"}}
                       className="form-demQuestionnaire-questions-text"/>
					   <div className="question_div2">
             <span className="question_title" style={{marginTop:"20px"}}>Style:</span><input type="text" value="Fast" placeholder="@TwitterName" ref="ref_question3"
                       className="form-demQuestionnaire-questions-text"/></div>
					   <input type="text" value="Light" placeholder="@TwitterName" ref="ref_question3"style={{marginLeft: "200px"}}
                       className="form-demQuestionnaire-questions-text"/>
             
                   
                </div>
            </div>
        </div>
      )
   }
}