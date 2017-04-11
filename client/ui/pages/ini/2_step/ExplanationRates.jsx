/*
 *created with ♥ by Gianluca Chiap
 */

import React, {Component} from 'react';
import FiveStars from '/client/ui/components/rate/FiveStars.jsx'
import { createContainer } from 'meteor/react-meteor-data';

export default class ExplanationRates extends Component {


    nextStep() {
        this.props.onNext();
    }

    render() {
        if (this.props.currentUser) {
            
            if (FlowRouter.current().params.ini_step != this.props.currentUser.ini_step) {
                
                FlowRouter.go("/ini/"+this.props.currentUser.ini_step)
            }
            if(this.props.currentUser.is_ini){
                FlowRouter.go("/profile");
            }
        }
        return (
            <div>
                <div>
                    <div className='jumbotron'>
                        <h1 className="text-center">N O W &nbsp; R A T E <br /> T H E &nbsp;T R A I L E R S</h1>

                        <div className="row">
                            <div className="col-sm-6 col-sm-offset-3">
                                <div className="dropdown">
                                    <button className="btn btn-default dropdown-toggle dropdownMenu1" type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <ul>?</ul>
                                    </button>
                                    <ul className="dropdown-menu" id="dropdown-menu1"  aria-labelledby="dropdownMenu1">
                                        <li>
                                            <a>
                                                In order to make better recommendations for you, we need a vote for
                                                the movies that you have selected before.
                                                Use the buttons shown below to give a score from 1 to 5 for the next
                                                movies.
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row" id="rate_ex">
                            <FiveStars isDisabled={true} rate_title="USE THIS BUTTONS TO RATE THE NEXT MOVIES"/>
                        </div>
 
                        <br />
                        <button className="btn btn-default btn_circle row button_ini"
                                onClick={this.nextStep.bind(this)}>S T A R T
                        </button>
                    </div>
                </div>
            </div>
        )
    }

};

export default createContainer(() => {

   const handleUser = Meteor.subscribe("pub_myself");
   let currentUser = null;
   if (handleUser.ready()) {
      currentUser = Meteor.user();
   }

   return {
      currentUser
   };
}, ExplanationRates);