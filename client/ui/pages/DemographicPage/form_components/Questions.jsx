/*
 * Created with ♥ by Anghileri Davide
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom';

/*
 Contains the input element for the questions during the demographic phase
 */

export default class extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            question_error_message: null
        }
    };


    checkQuestions( callBack ) {
        var questions = [0, 0, 0, 0, 0];
        this.setState( {
            question_error_message: null
        } );
        var question1 = ReactDOM.findDOMNode( this.refs.ref_question1 ).value;
        if ( !question1 ) {
            questions[0] = -2;  //missing response
        }
        else if ( question1 >= 0 && question1 <= 168 ) {
            questions[0] = question1;
        } else {
            questions[0] = -1; //impossibe response

            this.setState( {
                question_error_message: "Wrong number at first question"
            } );
        }
        var question2 = ReactDOM.findDOMNode( this.refs.ref_question2 ).value.trim();
        if ( !question2 ) {
            questions[1] = -2;  //missing response
        }
        else if ( question2 >= 0 && question2 <= 365 ) {
            questions[1] = question2;
        } else {
            questions[1] = -1;
            this.setState( {
                question_error_message: "Wrong number at second question"
            } );
        }
        var twitter = ReactDOM.findDOMNode( this.refs.ref_twitter ).value.trim();
        if ( twitter && twitter[0] == '@' ) {
            questions[2] = twitter;
        } else {
            questions[2] = -1;
            this.setState( {
                question_error_message: "Your twitter name must start with @"
            } );
        }
        var fb = ReactDOM.findDOMNode( this.refs.ref_fb ).value.trim();
        if ( fb ) {
            questions[3] = fb;
        } else {
            questions[3] = -1;
        }
        var instagram = ReactDOM.findDOMNode( this.refs.ref_instagram ).value.trim();
        if ( instagram ) {
            questions[4] = instagram;
        } else {
            questions[4] = -1;
        }

        callBack( questions );
    }

    render() {
        return ( <div>
            <div className="question_div">
                <span className="question_title">How many hours per week do you watch movies? </span><input type="number" placeholder="0" ref="ref_question1"
                    className="form-demQuestionnaire-questions-number" /> <span className="question_measure">Hours.</span> </div>
            <div className="question_div">
                <span className="question_title">How many times per year do you go to the cinema? </span><input type="number" placeholder="0" ref="ref_question2"
                    className="form-demQuestionnaire-questions-number" /> <span className="question_measure">Times.</span> </div>
            <div className="question_div2">
                <span className="question_title">Your Twitter name    (starting with @):</span><input type="text" placeholder="@TwitterName" ref="ref_twitter"
                    className="form-demQuestionnaire-questions-text" /></div>
            <div className="question_div2">
                <span className="question_title">Your Facebook ID: </span><input type="number" placeholder="FacebookID" ref="ref_fb"
                    className="form-demQuestionnaire-questions-text" /> </div>
            <div className="question_div2">
                <span className="question_title">Your Instagram ID: </span><input type="number" placeholder="InstagramID" ref="ref_instagram"
                    className="form-demQuestionnaire-questions-text" /> </div>

            <div className="colorError">
                {
                    this.state.question_error_message
                }
            </div>

        </div>
        )
    }
}

