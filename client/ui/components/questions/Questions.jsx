import React, { Component } from 'react'

export default class questions extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         selected: null
      };
   }
   render() {
	   var list=questionList
	   this.selected=this.props.questionId
	   questionText=list[this.selected].message
      return (
        <h1>
           {this.questionText}
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
   {_id: 10, message: "Conventional - Uncreative"},

];