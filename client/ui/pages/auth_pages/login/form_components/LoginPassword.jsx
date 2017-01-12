/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom';

export default class  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_valid_psw: false,
            error_message: null
        };
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.ref_psw).focus();
    }

    checkLoginPsw(callBack) {

        var psw = ReactDOM.findDOMNode(this.refs.ref_psw).value.trim();
        if (!psw) {
            this.setState({
                is_valid_psw: false,
                error_message: "Insert a password"
            });
            callBack(null);
        } else {
            this.setState({
                is_valid_psw: true,
                error_message: null
            });
            callBack(psw);
        }
    }

    render() {
        return (
            <div>
                <input type="password" placeholder="Password" ref="ref_psw" className="form-control"/>
                <div className="colorError">
                    {this.state.error_message ? this.state.error_message : null}
                </div>
            </div>
        )
    }
}
