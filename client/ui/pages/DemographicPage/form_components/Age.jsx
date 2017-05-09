/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom';

/*
 Contains the input element for the age field during the demographic questionnaire phase
 */

export default class  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_valid_age: false,
            age_error_message: null
        }
    };

   /*
    * since the age is the first field the gain focus after rendering
    *
    *	componentDidMount() {
    *    ReactDOM.findDOMNode(this.refs.ref_age).focus();
    *	}
    */

   
    checkAge(callBack) {
    	this.setState({
                age_error_message: null
        });
        var age = ReactDOM.findDOMNode(this.refs.ref_age).value;
        if (!age) {
            this.setState({
                age_error_message: "Insert your date of birth"
            });
            callBack(null);
        } else {
            callBack(age);
        }
    }

    render() {
        return (
            <div id="1">
                 <span className="age_title">Date of Birth:* </span><input type="date" placeholder="Age" ref="ref_age"
                       className="form-demQuestionnaire-age"/>
                <div className="colorErrorRed">
                    {(this.state.age_error_message && !this.state.is_valid_age)
                        ? this.state.age_error_message
                        : null}
                </div>
            </div>
        )
    }
}

