/*
 * Created with ? by Anghileri Davide
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import SelectTest from './DropDownMenu.jsx';


/*
 Contains the input element for the questions during the demographic phase
 */

export default class extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            nationality: null,
            nationality_error_message: null
        }
    };

    checkNationality( callBack ) {
        this.refs.nationality.checkNationality(( res ) => {
            
            if(!res){
                this.setState({nationality_error_message: "Select your country"});
                callBack(null );
            }else{
                this.setState({nationality: res});
                this.setState({nationality_error_message: null});
                callBack( this.state.nationality );
            }
        } );
        

    }


    render() {
        return (
            <div className="question_div2">
                <div className="leftpanel">
                    <span className="question_title">Nationality</span>
                </div>
                <div style={{ width: 200 }} className="rightpanel">
                    <SelectTest ref="nationality" style={{ float: "right" }} />
                </div>
                <div className="colorError">{( this.state.nationality_error_message ) ?
                    this.state.nationality_error_message : null}
                </div>
            </div>
        )
    }
}

