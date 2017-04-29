/*
 * Created with ? by Anghileri Davide
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import SelectTest from './DropDownMenu.jsx';


/*
 Contains the input element for the questions during the demographic phase
 */

export default class  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question_error_message: null
        }
    };


    

    render() {
        return (
			<div className="question_div2">
			<div className="leftpanel">
             <span className="question_title">Nationality</span>
			 </div>
			 <div style={{width: 200}} className="rightpanel">
			 <SelectTest style={{float:"right"}} />
			 </div>
			 </div>
        )
    }
}

