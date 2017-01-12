import React, { Component } from 'react'

export default class Star extends React.Component {
   constructor(props) {
      super(props);

      this.state = {};
   }

   onClickStar() {
      
      this.props.onClickStar(this.props.starId)
   }

   render() {
      let className="star";
      if(!this.props.noRate){
         if (this.props.isSelected ){
            className+=" selected"
         }
         else {
            className+=" not-selected"
         }
      }
      
      return (
        <button className={className} onClick={this.onClickStar.bind(this)}>
           {this.props.rate}
        </button>
      )
   }
}
