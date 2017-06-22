import React, { Component } from 'react'
import { routesPath, routesParam } from '/client/router/router';

import SevenStars from '/client/ui/components/rate/SevenStars.jsx'
import Questions from '/client/ui/components/questions/Questions.jsx'


export default class PersonalityQuestionnaire extends React.Component {
    constructor( props ) {
        super( props );
        this.saveRate1 = this.saveRate1.bind( this );
        this.saveRate2 = this.saveRate2.bind( this );
        this.saveRate3 = this.saveRate3.bind( this );
        this.saveRate4 = this.saveRate4.bind( this );
        this.saveRate5 = this.saveRate5.bind( this );
        this.state = {
            offset: 0,
            rates: [],
            questionId: 1,
        date_load: null
        };
    }
	
	componentDidMount() {
		if(!this.state.date_load){
	this.setState({
		date_load: (new Date).getTime()
		});}
  }

   /* componentDidUpdate() {
        this.refs.player.load();
    }*/
    arrayColumn( arr, n ) {
        return arr.map( x => x[n] );
    }
    goToTheNext() {
		pageTime= ((new Date).getTime()-this.state.date_load)/1000
        window.scrollTo( 0, 0 )
        if ( this.state.rates.length < 10 ) {
            this.refs.q1.resetVote()
            this.refs.q2.resetVote()
            this.refs.q3.resetVote()
            this.refs.q4.resetVote()
            this.refs.q5.resetVote()
            this.setState(( prevState ) => ( {
                questionId: prevState.questionId + 5,
                offset: 5
            } ) );
        } else {
            //SAVE DATA INTO DB
            Meteor.call( "s_save_personality_questions", this.state.rates, () => {
            } );
			pageTime= ((new Date).getTime()-this.state.date_load)/1000
			Meteor.call("update_page","PersonalityPage",pageTime)
            Meteor.call( "s_set_ini_step", "choose_from_catalog",pageTime, err => {
                if ( !err ) {
                    FlowRouter.setParams( { ini_step: "choose_from_catalog" } );
                }
            } )
            //FlowRouter.go(routesPath.INI_BASE_ROUTE + routesParam.INI_STEP_0);
        }
    }

    saveRate1( rate, startTime, callBack ) {

        if ( rate ) {
            var arrayTemp = this.state.rates.slice()
            if ( jQuery.inArray( "q" + ( 1 + this.state.offset ), this.arrayColumn( this.state.rates, 0 ) ) == -1 ) {
                arrayTemp.push( ["q" + ( 1 + this.state.offset ), rate] )
            } else {
                arrayTemp[0 + this.state.offset][1] = rate
            }
            this.setState( {
                rates: arrayTemp
            } );
        }
    }
    saveRate2( rate, startTime, callBack ) {
        if ( rate ) {
            var arrayTemp = this.state.rates.slice()
            if ( jQuery.inArray( "q" + ( 2 + this.state.offset ), this.arrayColumn( this.state.rates, 0 ) ) == -1 ) {
                arrayTemp.push( ["q" + ( 2 + this.state.offset ), rate] )
            }
            else {
                arrayTemp[1 + this.state.offset][1] = rate
            }
            this.setState( {
                rates: arrayTemp
            } );
        }
    }
    saveRate3( rate, startTime, callBack ) {
        if ( rate ) {
            var arrayTemp = this.state.rates.slice()
            if ( jQuery.inArray( "q" + ( 3 + this.state.offset ), this.arrayColumn( this.state.rates, 0 ) ) == -1 ) {
                arrayTemp.push( ["q" + ( 3 + this.state.offset ), rate] )
            }
            else {
                arrayTemp[2 + this.state.offset][1] = rate
            }
            this.setState( {
                rates: arrayTemp
            } );
        }
    }
    saveRate4( rate, startTime, callBack ) {
        if ( rate ) {
            var arrayTemp = this.state.rates.slice()
            if ( jQuery.inArray( "q" + ( 4 + this.state.offset ), this.arrayColumn( this.state.rates, 0 ) ) == -1 ) {
                arrayTemp.push( ["q" + ( 4 + this.state.offset ), rate] )
            }
            else {
                arrayTemp[3 + this.state.offset][1] = rate
            }
            this.setState( {
                rates: arrayTemp
            } );
        }
    }
    saveRate5( rate, startTime, callBack ) {
        if ( rate ) {
            var arrayTemp = this.state.rates.slice()
            if ( jQuery.inArray( "q" + ( 5 + this.state.offset ), this.arrayColumn( this.state.rates, 0 ) ) == -1 ) {
                arrayTemp.push( ["q" + ( 5 + this.state.offset ), rate] )
            }
            else {
                arrayTemp[4 + this.state.offset][1] = rate
            }
            this.setState( {
                rates: arrayTemp
            } );
        }
    }
    render() {

        return (
            <div className="row" id="spacerow">

                <span style={{
                    color: '#FFFFFF',
                    textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)',
                }}><h1>
                        Personality Questionnaire ({this.state.offset == 0 ? "1/2" : "2/2"})
                    </h1></span>
                <div className="formauthLarge">{( this.state.questionId < 6 ) ?
                    <i><font size="4" color="##66ff99">Instructions:</font> <font size="3" color="white">
                        Here are a number of personality traits that may or may not apply to you. <br />Please write a number next to
					    each statement to indicate the extent to which you agree<br /> or disagree with that statement. You should rate
					    the extent to which the pair of traits  <br /> applies to you, even if one characteristic applies more strongly than
					    the other.</font></i> : null}
                    <span style={{
                        color: '#FFFFFF',
                        textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                    }}><h2>
                            How much are you...
                    </h2></span>
                    <i><font size="3" color="white">1: Disagree Strongly 7:Agree Strongly</font></i>

                    <Questions questionId={this.state.questionId} />
                    <SevenStars last="0" ref="q1" onHandleVote={this.saveRate1} rate_title="" />
                    <Questions questionId={this.state.questionId + 1} />
                    <SevenStars last="0" ref="q2" onHandleVote={this.saveRate2} rate_title="" />
                    <Questions questionId={this.state.questionId + 2} />
                    <SevenStars last="0" ref="q3" onHandleVote={this.saveRate3} rate_title="" />
                    <Questions questionId={this.state.questionId + 3} />
                    <SevenStars last="0" ref="q4" onHandleVote={this.saveRate4} rate_title="" />
                    <Questions questionId={this.state.questionId + 4} />
                    <SevenStars last="0" ref="q5" onHandleVote={this.saveRate5} rate_title="" />
                    {this.state.rates.length < 5 + this.state.offset ? null : <button onClick={this.goToTheNext.bind( this )}
                        className="btn btn-default button_ini">N E X T</button>}
                </div>

            </div>
        )

    }
};
