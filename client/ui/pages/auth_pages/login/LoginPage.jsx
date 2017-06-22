/*
 *created with ♥ by Gianluca Chiap
 */

import React, {Component} from 'react';
import LoadingWrapper from '/client/ui/components/loading/LoadingWrapper.jsx'

import LoginEmail from './form_components/LoginEmail.jsx'
import LoginPassword from './form_components/LoginPassword.jsx'
import {routesPath, routesParam} from '/client/router/router';

export default class LoginPage extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: null,
            login_step: 0,
            is_processing: false,
            is_loading: false,
            error_message: null,
			date_load: null
        };
    }
	
	componentDidMount() {
	this.setState({
		date_load: (new Date).getTime()
	});
  }

    renderLoginStep() {

        switch (this.state.login_step) {
            case 0:
                return (<LoginEmail
                    ref="email_login_ref"/>);
            case 1:
                if (!this.state.email)
                    this.setState({
                        login_step: 0
                    });
                return (<LoginPassword
                    ref="psw_login_ref"/>);
            default:
                return;
        }
    }

    onFormLoginSubmit(event) {
		window.scrollTo(0, 0)
		
        event.preventDefault();
        switch (this.state.login_step) {
            case 0:
                this.setState({
                    is_processing: true
                });
                this.refs.email_login_ref.checkLoginEmail(this.onResultFromCheckEmail.bind(this));
                break;
            case 1:
                this.refs.psw_login_ref.checkLoginPsw(this.onResultFromCheckPsw.bind(this));
                break;
            default:
                return;
        }
    }

    onResultFromCheckEmail(email) {

        if (!email) {
            this.setState({
                is_processing: false
            })

        } else {
            this.setState(function (previousState) {
                return {
                    is_processing: false,
                    email: email,
                    login_step: previousState.login_step + 1
                };
            });
        }

    }

    onResultFromCheckPsw(psw) {
        if (!psw) {
            return;
        }
        this.onSubmitLoginValidForm(this.state.email, psw)
    }

    onSubmitLoginValidForm(email, psw) {
		url=window.location.pathname
		 pageTime= ((new Date).getTime()-this.state.date_load)/1000
	   Meteor.call("update_page","SignInPage",pageTime)
        Meteor.loginWithPassword(email, psw, err=> {
            if (err) {
                this.setState({
                    is_processing: false,
                    error_message: "The email and password you entered don't match"
                });
            } else {
                location.reload()
            }
        });
    }

    render() {
        var button_value = this.state.login_step ? "Login" : "Next";
        return (
            <LoadingWrapper loading_style="loader-spinning" isLoading={this.state.is_loading}>
                <div className="row" id="spacerow">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1><span
                            style={{color: '#FFFFFF', textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'}}>Log In</span>
                        </h1>

                        <div className="formauth">
                            <form onSubmit={this.onFormLoginSubmit.bind(this)} noValidate>
                                {this.renderLoginStep()}
                                <LoadingWrapper loading_style="loader-bars" is_processing={this.state.is_processing}>
                                    <input className="btn btn-default" type="submit" value={button_value}/>
                                </LoadingWrapper>
                            </form >
                            <div className="colorError">
                                {this.state.error_message ? this.state.error_message : null}
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingWrapper>
        )
    }
};