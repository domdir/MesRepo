/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import SingleQuestion from './SingleQuestion.jsx'
export default class RecQuestionnaire extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            questionnaireStep: 0,
            question_base: 0,
            isNext: false,
            total_votes: {},
            blocK_callbacks: {},
            block_votes: {},
            is_loading: false
        };
    }

    renderQuestion() {

        subQuestions = questions.slice( this.state.question_base,
            this.state.question_base + block[this.state.questionnaireStep] );

        return subQuestions.map(( question, i ) => {
            //
            return <SingleQuestion
                question_number={this.state.question_base + i}
                onHandleVote={this.onHandleVote.bind( this )} key={i}
                question={question} />
        } );
    }

    onHandleVote( vote, questionNum, callBack ) {
        let votes = this.state.block_votes;
        let total_votes = this.state.total_votes;
        let block_callback = this.state.blocK_callbacks;
        votes[questionNum] = vote;
        total_votes[questionNum] = vote;

        block_callback[questionNum] = callBack;

        this.setState( {
            block_votes: votes,
            total_votes: total_votes
        } );
    }

    onNextQuestion() {

        if ( this.state.questionnaireStep == 3 ) {

            Meteor.call( "s_save_questions_and_clean_rec", this.state.total_votes, () => {

            } );

            Meteor.call( "s_set_ini_step", 4, err => {
                if ( !err ) {
                    FlowRouter.setParams( { ini_step: "4" } );
                }
            } )
        } else {
            let step = this.state.questionnaireStep;
            for ( let key in this.state.blocK_callbacks ) {
                if ( this.state.blocK_callbacks.hasOwnProperty( key ) ) {
                    this.state.blocK_callbacks[key]();
                }
            }
            this.setState( {
                question_base: this.state.question_base + block[step],
                questionnaireStep: step + 1,
                block_votes: {}
            } )
        }
    }

    render() {
        let actualStep = this.state.questionnaireStep + 1;
        return (
            <div className="container-fluid questionnaire">
                <div className="row">
                    <h1>SURVEY <span style={{ fontSize: "25px" }}> ( {actualStep + "/4"} )</span></h1>
                    {this.state.questionnaireStep == 0 ?
                        <h5>{"List 1, 2 and 3 contains the top movie recommendations for you from different \"recommenders\". Please" +
                            " answer the following questions to help us understand your preferences about this recommendations."}
                        </h5> : null}
                    <div>
                        {this.renderQuestion()}
                    </div>
                    <div className="row">
                        {Object.keys( this.state.block_votes ).length === block[this.state.questionnaireStep] ?
                            <button className="btn btn-default button_ini" onClick={this.onNextQuestion.bind( this )}>N E X T
              </button> : null}
                    </div>
                </div>

            </div>
        )
    }
}


const block_title = ["Accuracy", "Diversity", "Understands Me", "Satisfaction", "Novelty"];

const block = [3, 4, 5, 5];

const questions = [
                   
    "How many movies of the first list have you seen?",
    "How many movies of the second list have you seen?",
    "How many movies of the third list have you seen?",
    
    
    "Which list has more movies that you find appealing?",
    //"Which list has more movies that might be among the best movies you see in the next year?",
    "Which list has more obviously bad movie recommendations for you?",
    //"Which list does a better job of putting better movies to the left?",

    "Which list has more movies that are similar to each other?",
    "Which list has a more varied selection of movies?",
    "Which list has movies that match a wider variety of moods?",
    //"Which list would suit a broader set of tastes?",

    "Which list better understand your taste in movies?",
    //"Which list would you trust more to provide you with recommendation?",
    "Which list seems more personalized to your movie ratings?",
    "Which list more represent mainstream tastes instead of your own?",

    "Which list would better help you find movies to watch?",
    "Which list would you be more likely to recommend to your friends?",
    //"Which list of recommendations do you find more valuable?",
    //"Which list would you rather have as an app on your mobile phone?",
    //"Which list would better help to pick satisfactory movies?",

    "Which list has more movies you do not expect?",
    "Which list has more movies that are familiar to you?",
    "Which list has more pleasantly surprising movies?",
    //"Which list has more movies you would not have thought to consider?",
    "Which list provides fewer new suggestion?"
];