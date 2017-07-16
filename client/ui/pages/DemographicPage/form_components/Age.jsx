/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Select from 'react-select'
import dayList from './dayList.json';
import monthList from './monthList.json';


/*
 Contains the input element for the age field during the demographic questionnaire phase
 */

export default class extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            options_day: [],
            options_month: [],
            options_year: [],
            selected_day: null,
            selected_month: null,
            selected_year: null,
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
        var optionsTempDay = [];
        for ( var i = 0; i < dayList.length; i++ ) {
            var day = dayList[i];
            optionsTempDay.push( { label: dayList[i].name, value: dayList[i].code } );
        }
        var optionsTempMonth = [];
        for ( var i = 0; i < monthList.length; i++ ) {
            var month = monthList[i];
            optionsTempMonth.push( { label: monthList[i].name, value: monthList[i].code } );
        }
        var optionsTempYear = [];
        for ( var i = 0; i < 100; i++ ) {
            var year = 2017 - i
            optionsTempYear.push( { label: year, value: year } );
        }
        this.setState( {
            options_day: optionsTempDay,
            options_month: optionsTempMonth,
            options_year: optionsTempYear
        } );
    }
    update_day( e ) { this.setState( { selected_day: e.value } ); }
    update_month( e ) { this.setState( { selected_month: e.value } ); }
    update_year( e ) { this.setState( { selected_year: e.value } ); }

    checkAge( callBack ) {
        if ( this.state.selected_day && this.state.selected_month && this.state.selected_year ) {
            var d = this.state.selected_day
            var m = this.state.selected_month
            var y = this.state.selected_year
            if ( ( d == "31" && m == "01" ) || ( d == "30" && m == "02" ) || ( d == "31" && m == "04" ) ||
                ( d == "31" && m == "06" ) || ( d == "31" && m == "09" ) || ( d == "31" && m == "11" ) ) {
                callBack( null );
                this.setState( {
                    age_error_message: "Date NOT valid"
                } );
            }
            else {
                var date = this.state.selected_month + "/" + this.state.selected_day + "/" + this.state.selected_year
                callBack( date );
            }
        } else {
            callBack( null );
            this.setState( {
                age_error_message: "Insert your Date of Birth"
            } );
        }

    }

    render() {
        return (
            <div className="question_div2">

                <span className="date_title">Date of Birth:*</span>

                <div style={{ width: 58 }} className="rightpanel">
                    <Select
                        options={this.state.options_day}
                        clearable={false}
                        searchable={false}
                        openOnFocus
                        onChange={this.update_day.bind( this )}
                        value={this.state.selected_day}
                        placeholder="Day" />
                </div><div style={{ width: 108 }} className="rightpanel">
                    <Select
                        options={this.state.options_month}
                        clearable={false}
                        searchable={false}
                        openOnFocus
                        onChange={this.update_month.bind( this )}
                        value={this.state.selected_month}
                        placeholder="Month" />
                </div>
                <div style={{ width: 70 }} className="rightpanel">
                    <Select
                        options={this.state.options_year}
                        clearable={false}
                        searchable={false}
                        openOnFocus
                        onChange={this.update_year.bind( this )}
                        value={this.state.selected_year}
                        placeholder="Year" />
                </div>

                <div className="colorErrorRed">
                    {( this.state.age_error_message && !this.state.is_valid_age )
                        ? this.state.age_error_message
                        : null}
                </div>
            </div>
        )
    }
}

