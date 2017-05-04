/*
 * Created with ♥ by Anghileri Davide
 */
import React, {Component} from 'react'

/*
 Contains the gender element for the questionnaire form
 */

export default class Gender extends React.Component {
   constructor(params) {
     super(params) 
     
     this.state = {
       gender: null,
       gender_error_message: null
     }
     this.setGender = this.setGender.bind(this)
  }
  
  setGender(e) {
    this.setState({
      gender: e.target.value
    })
  }
  
   /*
     check if one gender is selected
     */
    checkGender(callBack) {
            if (!this.state.gender) {
                this.setState({
                    gender_error_message: "Select your gender"
                });
                callBack(null);
            } else {
                this.setState({
                    gender_error_message: null
                });
                	callBack(this.state.gender);
                	}       
      }
    
  
  render() {
    const {gender,error_msg} = this.state
    return  <div className="gender_div">
       <span className="gender_title_text">Gender:* </span>
          <input type="radio" checked={gender == "male"} 
onClick={this.setGender} value="male" />  <span className="gender_text"> Male </span>
          <input type="radio" checked={gender == "female"} 
onClick={this.setGender} value="female"  />  <span className="gender_text"> Female </span>
	<input type="radio" checked={gender == "other"} 
onClick={this.setGender} value="other" />  <span className="gender_text"> Other </span>

	<div className="colorErrorRed">{(this.state.gender_error_message)? 
                  this.state.gender_error_message : null}
                </div>
</div>
  }
}
