/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class EndIni extends Component {

   constructor( props ) {
      super( props );

      this.state = {date_load: null
        };
    }
	
	componentDidMount() {
	this.setState({
		date_load: (new Date).getTime()
	});
  }
  componentWillUnmount() {
	   pageTime= ((new Date).getTime()-this.state.date_load)/1000
	   Meteor.call("update_page","Ini5Page",pageTime)
  }


   onNext() {
	   pageTime= ((new Date).getTime()-this.state.date_load)/1000
      Meteor.call( "initialize_user", ( err, res )=> {
         FlowRouter.go( "/profile" )
      } )
   }

   render() {
      if (this.props.currentUser) {
         if(this.props.currentUser.is_ini){
            FlowRouter.go( "/profile" )

         }else {

            if (FlowRouter.current().params.ini_step != this.props.currentUser.ini_step) {

               FlowRouter.go( "/ini/" + this.props.currentUser.ini_step )
            }
            if(this.props.currentUser.is_ini){
               FlowRouter.go("/profile");
            }
         }
      }

      return (
        <div >
           <div className='jumbotron'>
              <h1 className="text-center">T H A N K &nbsp; Y O U</h1>
              <h2 className="text-center">
                    <span style={{color: "#FFFFFF", fontFamily: 'MESFont5, sans-serif'}}>
                        <br /><br />E N J O Y</span></h2>
              <br />
              <br />
           </div>
           <button className="btn btn-default btn_circle row button_ini" onClick={this.onNext.bind(this)}>
              GO TO PROFILE
           </button>
        </div>
      )
   }
}


export default createContainer( () => {

   const handleUser = Meteor.subscribe( "pub_myself" );
   let currentUser = null;
   if (handleUser.ready()) {
      currentUser = Meteor.user();
   }

   return {
      currentUser
   };
}, EndIni );
