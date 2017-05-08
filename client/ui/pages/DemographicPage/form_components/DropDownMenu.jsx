
import React, { Component } from 'react'
import Select from 'react-select'

import countryList from './countryList.json';






export default class SelectTest extends Component {
    constructor( params ) {
        super( params )

        this.state = {
            options: [],
            selected: null,
        }
    }


    checkNation( callBack ) {

        if ( this.state.selected ) {
            callBack( this.state.selected );
        } else {
            callBack( null );
        }
    }


    render() {
        return ( 
            <Select 
                options={this.state.options}
                clearable={false}
                openOnFocus
                onChange={this.update.bind( this )}
                value={this.state.selected}
                placeholder="Search options..." />
            
        

        );
    }


    componentWillMount() {
        var optionsTemp = [];
        for ( var i = 0; i < countryList.length; i++ ) {
            var country = countryList[i];
            optionsTemp.push( { label: countryList[i].en_short_name, value: countryList[i].alpha_3_code } );
        }
        this.setState( {
            options: optionsTemp
        } );
    }
    update( e ) { this.setState( { selected: e.value } ); }
};



