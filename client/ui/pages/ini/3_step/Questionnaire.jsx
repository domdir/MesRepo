/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import SingleQuestion from './SingleQuestion.jsx';

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
            is_loading: false,
			blocks: [2,3,4,5,6],
			actualBlock: 0,
        date_load: null,
		timestamps: []
        };
        console.log(this.props.list_order) //run to see the order of the list locally
    }
	
	componentDidMount() {
	if(!this.state.date_load){
	this.setState({
		date_load: (new Date).getTime()
	});}
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
	shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
	return a
}
    onNextQuestion() {
		if(this.state.questionnaireStep==1){
			console.log(this.state.block_votes)
		maxValue=0
		maxKey=0
		for (var key in this.state.block_votes) {
		if (this.state.block_votes.hasOwnProperty(key)) {
			console.log(key, this.state.block_votes[key]);
			if(maxValue<this.state.block_votes[key]){
				maxValue=this.state.block_votes[key]
				maxKey=key
			}
			}
		}
		maxRec=this.props.list_order[maxKey-3]
		if(maxRec=="hybridRed"){
			maxRec="feature"
		}
		}
		timestamp=(new Date).getTime()
		pageTime= (timestamp-this.state.date_load)/1000
		vector_time=this.state.timestamps
		vector_time.push(timestamp)
		this.setState( {
            timestamps: vector_time
        } );
        window.scrollTo( 0, 0 )

        if ( this.state.questionnaireStep == 6 ) {
			Meteor.call( "s_get_n_final_movies",
            5,maxRec, ( err, res ) => {
            } );
			
            Meteor.call( "s_save_questions_and_clean_rec", [this.state.total_votes,this.props.list_order,this.state.timestamps], () => {

            } );
			pageTime= ((new Date).getTime()-this.state.date_load)/1000
			Meteor.call("update_page","Ini3Page",pageTime)
            Meteor.call( "s_set_ini_step", 4,pageTime, err => {
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
			if (this.state.questionnaireStep>0){
			blocks=this.shuffle(this.state.blocks)
			actual_block=blocks[blocks.length-1]
			blocks.pop()
			}else{
			actual_block=this.state.questionnaireStep
			}
            this.setState( {
                question_base: this.state.question_base + block[step],
                questionnaireStep: step + 1,
				actualBlock: actual_block,
                block_votes: {}
            } )
        }
    }

    render() {
        let actualStep = this.state.questionnaireStep + 1;
        return (
            <div className="container-fluid questionnaire">
                <div className="row">
                    <h1>SURVEY <span style={{ fontSize: "25px" }}> ( {actualStep + "/7"} )</span></h1>
                    {this.state.questionnaireStep == 0 ?
                        <h5>{"List 1, 2 and 3 contains the top movie recommendations for you from different \"recommenders\". Please" +
                            " answer the following questions to help us understand your preferences about this recommendations."}
                        </h5> : null}
                    {this.state.questionnaireStep == 1 ? <div>
                        <h5>{"Please, rate the three lists"}
						<br/>
						<i><font size="3" color="white">1:don't like 5:extremely like</font></i>
                            </h5>
                    </div> : null}
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

const block = [3, 3, 4, 4, 4, 5, 5];

const questions = [

    "How many movies of the first list have you seen?",
    "How many movies of the second list have you seen?",
    "How many movies of the third list have you seen?",

    "List 1:",
    "List 2:",
    "List 3:",

    "Which recommender would better help to pick satisfactory movies?",
	"Which list would suit a broader set of tastes?",
	"Which recommender most represent mainstream tastes instead of your own?",
	"Which list has the most movies that are familiar to you?",

	"Which list has the most pleasantly surprising movies?",
	"Which list has the most obviously bad movie recommendations for you?",
	"Which list has the most varied selection of movies?",
	"Which recommender would best help you find movies to watch?",

	"Which recommender does the best job of putting the best movies to the left?",
	"Which list has the most movies you would not have thought to consider to watch?",
	"Which list of recommendations do you find more valuable?",
	"Which recommender best understands your taste in movies?",

	"Which list has movies that match a wider variety of moods?",
	"Which recommender seems the most personalized to your movie taste?", 
	"Which list provides most new suggestions?",
	"Which recommender would you be the most likely to recommend to your friends?",
	"Which list has the most movies that you find appealing?",

	"Which recommender would you trust more to provide you with recommendation?",
	"Which list has the most movies that might be among the best movies you see in the next year?",
	"Which recommender would you rather have as an app on your mobile phone?", 
	"Which list has the most movies you do not expect?", 
	"Which list has the most movies that are similar to each other?"

];
