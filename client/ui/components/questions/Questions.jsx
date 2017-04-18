import React, { Component } from 'react'

import Star from './Star.jsx'

export default class Questions extends React.Component {
   constructor(props) {
      super(props);
	this.state = {
         questionMessage: null
      };
      
   }

   render() {
      var questionList = questionsList.map((rate, i) => {
         if (rate._id == this.props.questionId) {
            this.state.questionMessage=rate.message
         }
      });

      return (
        <h1>
		{this.state.questionMessage}
        </h1>
      )
   }
}
   
   const questionsList = [
   {_id: "1", message: "Extraverted - Enthusiastic"},
   {_id: "2", message: "Critical - Quarrelsome"},
   {_id: 3, message: "Dependable - Self Disciplined"},
   {_id: 4, message: "Anxious - Easily upset"},
   {_id: 5, message: "Open to new experiences - Complex"},
   {_id: 6, message: "Reserved - Quiet"},
   {_id: 7, message: "Sympathetic - Warm"},
   {_id: 8, message: "Disorganized - Careless"},
   {_id: 9, message: "Calm - Emotionally stable"},
   {_id: 10, message: "Conventional - Uncreative"}

];