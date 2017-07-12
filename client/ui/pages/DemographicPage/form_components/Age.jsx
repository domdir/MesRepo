/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Select from 'react-select'
import ageList from './ageList.json';

/*
 Contains the input element for the age field during the demographic questionnaire phase
 */

export default class  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
            selected: null,
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

    componentWillMount() {
        var optionsTemp = [];
        for ( var i = 0; i < ageList.length; i++ ) {
            var ages = ageList[i];
            optionsTemp.push( { label: ageList[i].name, value: ageList[i].code } );
        }
        this.setState( {
            options: optionsTemp
        } );
    }
    update( e ) { this.setState( { selected: e.value } ); }
   
    checkAge(callBack) {
        if ( this.state.selected ) {
            callBack( this.state.selected );
        } else {
            callBack( null );
            this.setState({
                age_error_message: "Select your Age"
            });
        }
    	
    }

    render() {
        return (
                <div className="question_div2">
                
                <span className="nationality_title">Age:*</span>
            
            <div style={{ width: 200 }} className="rightpanel">
                <Select style={{ float: "right" }}
                options={this.state.options}
                clearable={false}
                searchable={false}
                openOnFocus
                onChange={this.update.bind( this )}
                value={this.state.selected}
                placeholder="Search options..." />
            </div>
       
                <div className="colorErrorRed">
                    {(this.state.age_error_message && !this.state.is_valid_age)
                        ? this.state.age_error_message
                        : null}
               </div>
            </div>
        )
    }
}

