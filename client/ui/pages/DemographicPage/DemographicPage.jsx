import React, { Component } from 'react'

import Age from './form_components/Age.jsx';
import Gender from './form_components/Gender.jsx';
import Nationality from './form_components/Nationality.jsx'
import Questions from './form_components/Questions.jsx';
import LoadingWrapper from '/client/ui/components/loading/LoadingWrapper.jsx'
import { routesPath, routesParam } from '/client/router/router';
import SelectTest from './form_components/DropDownMenu.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'




export default class DemographicPage extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            is_processing: false,
            error_message: null,
            questionnaire_done: false
        };
    }

    onFormQuestionnaireSubmit( event ) {
        event.preventDefault();
        this.setState( { is_processing: true, error_message: null } );
        this.checkErrors(( res ) => {
            this.setState( { is_processing: false, error_message: null } );
        this.setState( { is_processing: false, error_message:  null} );
            if ( res.age && res.gender && res.nationality) {
                
                this.onSubmitQuestionnaireValidForm( res );
            }
        } );
    }

    checkErrors( callBack ) {
        var credentials = {
            "age": null,
            "gender": null,
            "nationality": null,
            "question1": [],
            "question2": [],
            "twitter": null,
            "fb": null,
            "instagram": null,
            "lastfm": null,
            "spotify": null
        };
        this.refs.age.checkAge(( res ) => {
            credentials.age = res;
            this.refs.gender.checkGender(( res ) => {
                credentials.gender = res;
                this.refs.questions.checkQuestions(( res ) => {
                    credentials.question1 = res[0];
                    credentials.question2 = res[1];
                    credentials.twitter = res[2];
                    credentials.fb = res[3];
                    credentials.instagram = res[4];
                    credentials.lastfm = res[5];
                    credentials.spotify = res[6];
                    this.refs.nationality.checkNationality(( res ) => {
                        credentials.nationality = res;

                        this.setState( { is_processing: false } );
                    } );
                } )
            } )
        } );
            callBack( credentials );
    }


    onSubmitQuestionnaireValidForm(res) {
        this.setState( { is_processing: false, error_message: res } );
       this.setState( { questionnaire_done: true, error_message: null } );
		 

        //SAVE DATA INTO DB
        //Meteor.call("s_save_dem_questions", res, ()=> {
        //});
        
        Meteor.call( "s_set_ini_step", "personality_questionnaire", err => {
            if ( !err ) {
                FlowRouter.setParams( { ini_step: "personality_questionnaire" } );
            }
        } )
        //FlowRouter.go(routesPath.INI_BASE_ROUTE + routesParam.INI_STEP_0);

    }

    render() {
		

        return (
            <div className="row" id="spacerow" >

                <h1>
                    <span style={{
                        color: '#FFFFFF',
                        textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                    }}>Demographic Questionnaire</span>
                </h1>
                <div className="formauth">
                    <LoadingWrapper loading_style="loader-spinning" processing_message="test"
                        is_processing={this.state.questionnaire_done}>

                        <form className="form-demQuestionnaire" onSubmit={this.onFormQuestionnaireSubmit.bind(this)} noValidate>
                            <Age ref="age" />
                            <Gender ref="gender" />
                            <Nationality ref="nationality" />
                            <Questions ref="questions" />
                            <LoadingWrapper loading_style="loader-bars" is_processing={this.state.is_processing}>
                                <input className="btn-questionnaire btn-default" type="submit" value="FINISH" />
                            </LoadingWrapper>
                            <div className="colorError">
                                {( this.state.error_message )
                                    ? this.state.error_message
                                    : null}
                            </div>
                        </form >
                    </LoadingWrapper>

                </div>
            </div>
        )
    }
};
