/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom';

/*
 Contains the input element for the username field during the sign up phase
 */

export default class SignUpUserName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_valid_userName: false,
            username_error_message: null
        };
    }

    /*
     check if the username is valid--> a not null string
     */
    checkUserName(callBack) {
        var userName = ReactDOM.findDOMNode(this.refs.ref_userName).value.trim();
        Meteor.call("m_check_userName", userName, (err) => {
            if (err) {
                this.setState({
                    is_valid_userName: false,
                    username_error_message: err.reason
                });
                callBack(null);
            } else {
                this.setState({
                    is_valid_userName: true,
                    username_error_message: null
                });
                callBack(userName);
            }
        });

    }

    render() {
        return (
            <div>
                <input type="text" placeholder="User name" ref="ref_userName"
                       className="form-control"/>
                <div className="colorError">
                    {(this.state.username_error_message && !this.is_valid_userName)
                        ? this.state.username_error_message
                        : null}
                </div>

            </div>

        )
    }
}
