/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom';

export default class SignUpPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            psw_input_class: "none",
            psw_error_message: null
        };
    }

    checkPsw(callBack) {
        let psw = ReactDOM.findDOMNode(this.refs.ref_psw1).value.trim();
        this.setState({
            psw_error_message: null

        });
        if (!psw) {
            this.setState({
                psw_error_message: "Insert a password"
            });
            callBack(null);
        } else {
            callBack(psw);
        }
    }

    checkPswMatch() {

    }

    render() {
        return (
            <div>
                <input type="password" className="form-control"
                       placeholder="Password"
                       ref="ref_psw1"
                       onChange={this.checkPswMatch}/>
                <div className="colorError">
                    {(this.state.psw_error_message) ? this.state.psw_error_message : null}
                </div>
            </div>
        )
    }
}
