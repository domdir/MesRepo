/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */
import React, {Component,} from 'react'
import ReactDOM from 'react-dom';

export default class LoginEmail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_valid_email: false,
            error_message: null
        };
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.ref_email).focus();
    }

    checkLoginEmail(callBack) {

        var email = ReactDOM.findDOMNode(this.refs.ref_email).value.trim();
        Meteor.call("m_check_mail_is_valid_login", email, err=> {
            if (err) {
                this.setState({
                    is_valid_email: false,
                    error_message: err.reason
                });
                callBack(null);
            } else {
                callBack(email);
            }
        })
    }

    render() {
        return (
            <div>
                <input type="email" placeholder="Email" ref="ref_email" className="form-control"/>
                <div className="colorError">
                    {this.state.error_message ? this.state.error_message : null}
                </div>
            </div>
        )
    }
}
