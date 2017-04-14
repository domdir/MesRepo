/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, {Component} from 'react'

import SignUpEmail from './form_components/SignUpEmail.jsx';
import SignUpUserName from './form_components/SignUpUserName.jsx';
import SignUpPassword from './form_components/SignUpPassword.jsx';
import LoadingWrapper from '/client/ui/components/loading/LoadingWrapper.jsx'
import {routesPath, routesParam} from '/client/router/router';


export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_processing: false,
            error_message: null,
            is_signup: false
        };
    }

    onFormSignUpSubmit(event) {
        event.preventDefault();

        this.setState({is_processing: true, error_message: null});
        this.checkErrors((res) => {
            this.setState({is_processing: false, error_message: null});
            if (res.email && res.user_name && res.psw) {
                this.onSubmitSignUpValidForm(res);
            }
        });
    }

    checkErrors(callBack) {
        var credentials = {
            "email": null,
            "user_name": null,
            "psw": null
        };
        this.refs.signup_email.checkSignUpEmail((res) => {
            credentials.email = res;
            this.refs.signup_userName.checkUserName((res) => {
                credentials.user_name = res;
                this.refs.signup_psw.checkPsw((res) => {
                    credentials.psw = res;
                    this.setState({is_processing: false});
                    callBack(credentials);
                });
            })
        });
    }

    onSubmitSignUpValidForm(credential) {
        this.setState({is_signup: true, error_message: null});

        Accounts.createUser({
            email: credential.email,
            password: credential.psw,
            profile: credential.user_name
        }, (error) => {
            if (error) {
                this.setState({
                    is_signup: false,
                    error_message: error.reason
                });
            } else {
                FlowRouter.go(routesPath.DEM_ROUTE);
            }
        });
    }

    render() {
        return (
            <div className="row" id="spacerow">
                <div className="col-sm-6 col-sm-offset-3">
                    <h1>
            <span style={{
                            color: '#FFFFFF',
                            textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
                        }}>Join Us</span>
                    </h1>
                    <div className="formauth">
                        <LoadingWrapper loading_style="loader-spinning" processing_message="test"
                                        is_processing={this.state.is_signup}>
                            <form onSubmit={this.onFormSignUpSubmit.bind(this)} noValidate>
                                <SignUpEmail ref="signup_email"/>
                                <SignUpUserName ref="signup_userName"/>
                                <SignUpPassword ref="signup_psw"/>
                                <LoadingWrapper loading_style="loader-bars" is_processing={this.state.is_processing}>
                                    <input className="btn btn-default" type="submit" value="Join us"/>
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
            </div>
        )
    }
};