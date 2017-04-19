import React, {Component} from 'react'

import Age from './form_components/Age.jsx';
import Gender from './form_components/Gender.jsx';
//import Country from './form_components/Country.jsx';
import Questions from './form_components/Questions.jsx';
import SignUpPassword from './form_components/SignUpPassword.jsx';
import LoadingWrapper from '/client/ui/components/loading/LoadingWrapper.jsx'
import {routesPath, routesParam} from '/client/router/router';


export default class DemographicPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_processing: false,
            error_message: null,
            questionnaire_done: false
        };
    }

    onFormQuestionnaireSubmit(event) {
        event.preventDefault();

        this.setState({is_processing: true, error_message: null});
        
        this.checkErrors((res) => {
            this.setState({is_processing: false, error_message: null});
          if (res.age && res.gender) {
               this.onSubmitQuestionnaireValidForm(res);
        }
     });
    }

    checkErrors(callBack) {
       var credentials = {
            "age": null,
            "gender": null,
            "questions": null
        };
        this.refs.age.checkAge((res) => {
            credentials.age = res;
            	this.refs.gender.checkGender((res) => {
             	credentials.gender = res;
   		            this.refs.questions.autoCompleteQuestions((res) => {
   	                credentials.questions = res;
   	                
                    this.setState({is_processing: false});
               });
   
           })
        	callBack(credentials);
        });
    }


    onSubmitQuestionnaireValidForm() {
    	this.setState({is_processing: false, error_message: null});
        this.setState({questionnaire_done: true, error_message: null});
        
		//SAVE DATA INTO DB
        FlowRouter.go(routesPath.PERSONALITY_ROUTE);
        //FlowRouter.go(routesPath.INI_BASE_ROUTE + routesParam.INI_STEP_0);
         
    }

    render() {
    
        return (
            <div className="row" id="spacerow">
                
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
                                <Age ref="age"/>
                                <Gender ref="gender"/>
                                <Questions ref="questions"/>
                               
                                
                                
                                <LoadingWrapper loading_style="loader-bars" is_processing={this.state.is_processing}>
                                    <input className="btn-questionnaire btn-default" type="submit" value="FINISH"/>
                                </LoadingWrapper>
                                <div className="colorError">
                                    {(this.state.error_message)
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