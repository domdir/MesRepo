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
            value_question1: 0,
            value_question1_tv: 0,
            value_question1_physical_medium: 0,
            value_question1_streaming: 0,
            value_question1_other: 0,
            value_question1_home: 0,
            value_question1_way: 0,
            value_question1_www: 0,
            value_question1_other2: 0,
            question_error_message: null
        }
    };


    handleChangeQuestion1( event ) {
        //put to 0 all the sub_number (e.g. tv,streaming,...) to prevent inconsistency
        this.setState( {
            value_question1_tv: 0,
            value_question1_physical_medium: 0,
            value_question1_streaming: 0,
            value_question1_home: 0,
            value_question1_way: 0,
            value_question1_www: 0
        } );
        //save the new value in the state
        this.setState( {
            value_question1: event.target.value,
            value_question1_other: event.target.value,
            value_question1_other2: event.target.value
        } );
    }
    handleChangeQuestion1Tv( event ) {
        old = this.state.value_question1_tv
        //eliminate eventual zeros in front of the number
        input = parseInt( event.target.value )
        residual_hours = this.state.value_question1 - input - Number( this.state.value_question1_physical_medium ) - Number( this.state.value_question1_streaming )
        if ( residual_hours >= 0 ) {   //not inserted a wrong number
            //save the new value in the state
            this.setState( {
                value_question1_tv: input,
                value_question1_other: Number( this.state.value_question1 ) - input
                - Number( this.state.value_question1_physical_medium ) - Number( this.state.value_question1_streaming )
            } );
        }
    }
    handleChangeQuestion1PhysicalMedium( event ) {
        old = this.state.value_question1_physical_medium
        //eliminate eventual zeros in front of the number
        input = parseInt( event.target.value )
        residual_hours = this.state.value_question1 - input - Number( this.state.value_question1_tv ) - Number( this.state.value_question1_streaming )
        if ( residual_hours >= 0 ) {   //not inserted a wrong number
            //save the new value in the state
            this.setState( {
                value_question1_physical_medium: input,
                value_question1_other: Number( this.state.value_question1 ) - Number( this.state.value_question1_tv )
                - input - Number( this.state.value_question1_streaming )
            } );
        }
    }
    handleChangeQuestion1Streaming( event ) {
        old = this.state.value_question1_streaming
        //eliminate eventual zeros in front of the number
        input = parseInt( event.target.value )
        residual_hours = this.state.value_question1 - input - Number( this.state.value_question1_tv ) - Number( this.state.value_question1_physical_medium )
        if ( residual_hours >= 0 ) {   //not inserted a wrong number
            //save the new value in the state
            this.setState( {
                value_question1_streaming: input,
                value_question1_other: Number( this.state.value_question1 ) - Number( this.state.value_question1_tv )
                - Number( this.state.value_question1_physical_medium ) - input
            } );
        }
    }
    handleChangeQuestion1Home( event ) {
        old = this.state.value_question1_home
        //eliminate eventual zeros in front of the number
        input = parseInt( event.target.value )
        residual_hours = this.state.value_question1 - input - Number( this.state.value_question1_way ) - Number( this.state.value_question1_www )
        if ( residual_hours >= 0 ) {   //not inserted a wrong number
            //save the new value in the state
            this.setState( {
                value_question1_home: input,
                value_question1_other2: Number( this.state.value_question1 ) - input
                - Number( this.state.value_question1_way ) - Number( this.state.value_question1_www )
            } );
        }
    }
    handleChangeQuestion1Way( event ) {
        old = this.state.value_question1_way
        //eliminate eventual zeros in front of the number
        input = parseInt( event.target.value )
        residual_hours = this.state.value_question1 - input - Number( this.state.value_question1_home ) - Number( this.state.value_question1_www )
        if ( residual_hours >= 0 ) {   //not inserted a wrong number
            //save the new value in the state
            this.setState( {
                value_question1_way: input,
                value_question1_other2: Number( this.state.value_question1 ) - Number( this.state.value_question1_home )
                - input - Number( this.state.value_question1_www )
            } );
        }
    }
    handleChangeQuestion1www( event ) {
        old = this.state.value_question1_www
        //eliminate eventual zeros in front of the number
        input = parseInt( event.target.value )
        residual_hours = Number( this.state.value_question1 ) - input - Number( this.state.value_question1_home ) - Number( this.state.value_question1_way )
        if ( residual_hours >= 0 ) {   //not inserted a wrong number
            //save the new value in the state
            this.setState( {
                value_question1_www: input,
                value_question1_other2: Number( this.state.value_question1 ) - Number( this.state.value_question1_home )
                - Number( this.state.value_question1_way ) - input
            } );
        }
    }





    checkQuestions( callBack ) {
        var question1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        var other1 = null;
        var other2 = null;
        var question2 = 0;
        var twitter = null;
        var fb = null;
        var instagram = null;
        var lastfm = null;
        var spotify = null;
        this.setState( {
            question_error_message: null
        } );
        var question1tot = ReactDOM.findDOMNode( this.refs.ref_question1 ).value;
        if ( !question1tot ) {
            question1[0] = -1;  //missing response
        }
        else if ( question1tot >= 0 && question1tot <= 168 ) {
            question1[0] = question1tot;
            question1[1] = this.state.value_question1_tv;
            question1[2] = this.state.value_question1_physical_medium;
            question1[3] = this.state.value_question1_streaming;
            question1[4] = this.state.value_question1_other;
            question1[5] = this.state.value_question1_home;
            question1[6] = this.state.value_question1_way;
            question1[7] = this.state.value_question1_www;
            question1[8] = this.state.value_question1_other2;

        } else {
            question1[0] = -2; //impossible response

            this.setState( {
                question_error_message: "Wrong number at first question"
            } );
        }
        var question2_temp = ReactDOM.findDOMNode( this.refs.ref_question2 ).value.trim();
        if ( !question2_temp ) {
            question2 = -1;  //missing response
        }
        else if ( question2_temp >= 0 && question2_temp <= 365 ) {
            question2 = question2_temp;
        } else {
            question2 = -2; //impossible response
            this.setState( {
                question_error_message: "Wrong number at second question"
            } );
        }
        var twitter = ReactDOM.findDOMNode( this.refs.ref_twitter ).value.trim();
        if ( !twitter ) {
            twitter = -1;  //missing response
        }
        else if ( twitter[0] != '@' ) {
            twitter = -2;
            this.setState( {
                question_error_message: "Your twitter name must start with @"
            } );
        }
        var fb = ReactDOM.findDOMNode( this.refs.ref_fb ).value.trim();
        if ( !fb ) {
            fb = -1;
        }
        var instagram = ReactDOM.findDOMNode( this.refs.ref_instagram ).value.trim();
        if ( !instagram ) {
            instagram = -1;
        }
        var lastfm = ReactDOM.findDOMNode( this.refs.ref_lastfm ).value.trim();
        if ( !lastfm ) {
            lastfm = -1;
        }
        var spotify = ReactDOM.findDOMNode( this.refs.ref_spotify ).value.trim();
        if ( !spotify ) {
            spotify = -1;
        }
        if ( this.state.value_question1 ) { //if it is created the element with the other field text
            other1 = ReactDOM.findDOMNode( this.refs.ref_other_name ).value.trim();
            other2 = ReactDOM.findDOMNode( this.refs.ref_other_name2 ).value.trim();
        }
        res = [question1, other1, other2, question2, twitter, fb, instagram, lastfm, spotify];
        callBack( res );
    }

    render() {
        return ( <div>
            <div className="question_div">
                <span className="question_title3">how many hours per week do you watch movies <u>excluding</u> TV series/serials? </span><input type="number" onChange={this.handleChangeQuestion1.bind( this )} placeholder="0" ref="ref_question1"
                    className="form-demQuestionnaire-questions-number" /> <span className="question_measure">Hours.</span> </div>
            <div className="question_div">{( this.state.value_question1 ) ?
                <div className="block">
                    <div className="question_title2">Out of these {this.state.value_question1} hours, how many do you watch:  </div>
                    <div className="question_div_center"><span className="choice"> 1) On Tv </span>
                        <input type="number" placeholder="0" ref="ref_tv" onChange={this.handleChangeQuestion1Tv.bind( this )} value={this.state.value_question1_tv}
                            className="float-right" /> </div>
                    <div className="question_div_center"><span className="choice">2) From a physical medium (DVD/BluRay)</span>
                        <input type="number" placeholder="0" ref="ref_physical_medium" onChange={this.handleChangeQuestion1PhysicalMedium.bind( this )} value={this.state.value_question1_physical_medium}
                            className="float-right" /></div>
                    <div className="question_div_center"><span className="choice">3) Through streaming services, such as Netflix</span>
                        <input type="number" placeholder="0" ref="ref_streaming" onChange={this.handleChangeQuestion1Streaming.bind( this )} value={this.state.value_question1_streaming}
                            className="float-right" /> </div>
                    <div className="question_div_center"><span className="choice">4) Others (please specify)</span>
                        <input type="text" placeholder="Other..." ref="ref_other_name"
                            className="form-demQuestionnaire-questions-text" />
                        <input type="number" ref="ref_other_value" value={this.state.value_question1_other} readOnly
                            className="float-right" /> </div>
                </div>
                : null}
            </div>
            <div className="question_div">{( this.state.value_question1 ) ?
                <div className="block">
                    <div className="question_title2">Out of these {this.state.value_question1} hours, how many do you watch: </div>
                    <div className="question_div_center"><span className="choice"> 1) At home </span>
                        <input type="number" placeholder="0" ref="ref_home" onChange={this.handleChangeQuestion1Home.bind( this )} value={this.state.value_question1_home}
                            className="float-right" /> </div>
                    <div className="question_div_center"><span className="choice">2) On the way (traveling, commuting, etc.)</span>
                        <input type="number" placeholder="0" ref="ref_way" onChange={this.handleChangeQuestion1Way.bind( this )} value={this.state.value_question1_way}
                            className="float-right" /></div>
                    <div className="question_div_center"><span className="choice">3) www</span>
                        <input type="number" placeholder="0" ref="ref_www" onChange={this.handleChangeQuestion1www.bind( this )} value={this.state.value_question1_www}
                            className="float-right" /> </div>
                    <div className="question_div_center"><span className="choice">4) Others (please specify)</span>
                        <input type="text" placeholder="Other..." ref="ref_other_name2"
                            className="form-demQuestionnaire-questions-text" />
                        <input type="number" ref="ref_other_value" value={this.state.value_question1_other2} readOnly
                            className="float-right" /> </div>
                </div>
                : null}

            </div>


            <div className="question_div3">
                <span className="question_title3">How many times per year do you go to the cinema? </span><input type="number" placeholder="0" ref="ref_question2"
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
            <div className="question_div2">
                <span className="question_title">Your Last.fm username:</span><input type="text" placeholder="Last.fm" ref="ref_lastfm"
                    className="form-demQuestionnaire-questions-text" /></div>
            <div className="question_div2">
                <span className="question_title">Your Spotify username:</span><input type="text" placeholder="Spotify" ref="ref_spotify"
                    className="form-demQuestionnaire-questions-text" /></div>

            <div className="colorErrorRed">
                {
                    this.state.question_error_message
                }
            </div>

        </div>
        )
    }
}

