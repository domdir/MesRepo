/*
 * Created with ♥ by Anghileri Davide
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom';

/*
 Contains the input element for the questions during the demographic phase
 */

export default class  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question_error_message: null
        }
    };


    autoCompleteQuestions(callBack) {
		var questions = [0,0,0,0];
        var question1 = ReactDOM.findDOMNode(this.refs.ref_question1).value.trim();
            if (question1) {
                questions[1]=question1;
            } 
             this.setState({
                question_error_message: questions
            });
                callBack(questions);
       }

    render() {
        return (<div>
            <div className="question_div">
             <span className="question_title">How many hours per week do you watch movies? </span><input type="number" placeholder="0" ref="ref_question1"
                       className="form-demQuestionnaire-questions-number"/> <span className="question_measure">Hours.</span> </div>
              <div className="question_div">
             <span className="question_title">How many times per year do you go to the cinema? </span><input type="number" placeholder="0" ref="ref_question2"
                       className="form-demQuestionnaire-questions-number"/> <span className="question_measure">Times.</span> </div>
             <div className="question_div2">
             <span className="question_title">Your Twitter name    (starting with @):</span><input type="text" placeholder="@TwitterName" ref="ref_question3"
                       className="form-demQuestionnaire-questions-text"/></div>
             <div className="question_div2">
             <span className="question_title">Your Facebook ID: </span><input type="number" placeholder="FacebookID" ref="ref_question4"
                       className="form-demQuestionnaire-questions-text"/> </div>
			<div className="question_div2">
             <span className="question_title">Your Instagram ID: </span><input type="number" placeholder="InstagramID" ref="ref_question4"
                       className="form-demQuestionnaire-questions-text"/> </div>
             
                <div className="colorError">
                    {
                        this.state.question_error_message
                        }
                </div>
           
            </div>
        )
    }
}

