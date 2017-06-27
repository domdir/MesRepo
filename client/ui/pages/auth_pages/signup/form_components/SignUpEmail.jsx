/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom';

/*
 Contains the input element for the email field during the sign up phase
 */

export default class  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_valid_mail: false,
            email_error_message: null
        }
    };

    /*
     since the email is the first field the gain focus after rendering
     */
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.ref_email).focus();
    }

    /*
     check if the mail used for the registration is valid--> valid form + not already used. If the conditions
     are satisfied return the email, otherwise return null (in a callback)
     */
    checkSignUpEmail(callBack) {

        var email = ReactDOM.findDOMNode(this.refs.ref_email).value.trim();
        Meteor.call("m_check_email_can_be_used", email, (err) => {
            if (err) {

                this.setState({
                    is_valid_mail: false,
                    email_error_message: err.reason
                });
                callBack(null);
            } else {
                this.setState({
                    is_valid_mail: true,
                    email_error_message: null
                });
                callBack(email);
            }
        });
    }

    render() {
        return (
            <div>
			<a href="https://stackoverflow.com/questions/3559467/description-box-on-mouseover" title="You will not receive any email from us,
			neither your email-adress will be shared with anyone">
                <input type="email" placeholder="Email" ref="ref_email"
                       className="form-control"/></a>
                <div className="colorError">
                    {(this.state.email_error_message && !this.state.is_valid_mail)
                        ? this.state.email_error_message
                        : null}
                </div>
            </div>
        )
    }
}

