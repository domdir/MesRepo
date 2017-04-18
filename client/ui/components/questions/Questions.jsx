import React, { Component } from 'react'

import Star from './Star.jsx'

export default class Questions extends React.Component {
   constructor(props) {
      super(props);
	this.state = {
         questionMessage: null,
		 imgSource: null
      };
      
   }

   render() {
      var questionList = questionsList.map((rate, i) => {
         if (rate._id == this.props.questionId) {
            this.state.questionMessage=rate.message
			this.state.imgSource=rate.imgSource
         }
      });

      return (
	  <div>
	  <img src="/public/personalityImages/1.jpg" height="250" width="350"/>
		<span style={{
                    color: '#FFFFFF',
					textShadow: '0px 2px 5px rgba(37, 35, 40, 0.5)'
					}}>
					<div>{this.state.questionId}</div>
        <h1>
		{this.state.questionMessage}
        </h1></span>
		</div>
      )
   }
}
   
   const questionsList = [
   {_id: 1, message: "Extraverted - Enthusiastic", imgSource: "http://localhost:3000/public/personalityImages/1.jpg"},
   {_id: 2, message: "Critical - Quarrelsome"},
   {_id: 3, message: "Dependable - Self Disciplined"},
   {_id: 4, message: "Anxious - Easily upset"},
   {_id: 5, message: "Open to new experiences - Complex"},
   {_id: 6, message: "Reserved - Quiet"},
   {_id: 7, message: "Sympathetic - Warm"},
   {_id: 8, message: "Disorganized - Careless"},
   {_id: 9, message: "Calm - Emotionally stable"},
   {_id: 10, message: "Conventional - Uncreative"}

];