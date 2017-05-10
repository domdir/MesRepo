/*
 * Created with ♥ by Anghileri Davide
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom';

/*
 Contains the privacy checkbox and statement for the questionnaire form
 */

export default class Privacy extends React.Component {
    constructor( params ) {
        super( params )
        this.state = {
            privacy_error_message: null
        }

    }


    /*
      check if the checkbox is selected
      */
    checkPrivacy( callBack ) {
        var privacy = this.refs.ref_privacy.checked
        if ( !privacy ) {
            this.setState( {
                privacy_error_message: "You have to accept the Privacy policy"
            } );
            callBack( null );
        } else {
            this.setState( {
                privacy_error_message: null
            } );
            callBack( privacy );
        }
    }


    render() {

        return <div><div className="privacy_div">
            <input type="checkbox" ref="ref_privacy" />
            <span className="privacy_title_text">I accept the Privacy policy - </span>
            <div className="dropdown">
                <button className=" dropdownMenuPrivacy" type="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <ul> more info</ul>
                </button>
                <ul className="dropdown-menu" id="dropdown-menuPrivacy" aria-labelledby="dropdownMenu1">
                    <li>
                        <a>
                            <font color="#26c6da">PRIVACY AND CONFIDENTIALITY STATEMENT</font><br/>
                All responses given to Mise-En-Scène.com, including any personal information
                you provide, will be kept strictly confidential. Your input will only be used
                in combination with the responses of others participating in the survey. Our
                research examines the opinions of groups of respondents. Your individual
                responses are not shown to anyone.
                    </a>
                    </li>
                </ul>
            </div>
        </div>
            <div className="colorErrorRed">{( this.state.privacy_error_message ) ?
                this.state.privacy_error_message : null}
            </div></div>
    }
}
