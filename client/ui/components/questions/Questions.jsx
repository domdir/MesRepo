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
   {_id: 1, message: "Extraverted, Enthusiastic", imgSource: "/personalityImages/1.jpg"},
   {_id: 2, message: "Critical, Quarrelsome", imgSource: "/personalityImages/2.jpg"},
   {_id: 3, message: "Dependable, Self Disciplined", imgSource: "/personalityImages/3.jpg"},
   {_id: 4, message: "Anxious, Easily upset", imgSource: "/personalityImages/4.jpg"},
   {_id: 5, message: "Open to new experiences, Complex", imgSource: "/personalityImages/5.jpg"},
   {_id: 6, message: "Reserved, Quiet", imgSource: "/personalityImages/6.jpg"},
   {_id: 7, message: "Sympathetic, Warm", imgSource: "/personalityImages/7.jpg"},
   {_id: 8, message: "Disorganized, Careless", imgSource: "/personalityImages/8.jpg"},
   {_id: 9, message: "Calm, Emotionally stable", imgSource: "/personalityImages/9.jpg"},
   {_id: 10, message: "Conventional, Uncreative", imgSource: "/personalityImages/10.jpg"}

];