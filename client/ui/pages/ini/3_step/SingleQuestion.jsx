/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import Star from '/client/ui/components/rate/Star.jsx'

export default class SingleQuestion extends Component {
   constructor(props) {
      super(props);

      this.state = {
         voteSelected: null
      };
   }

   onClickStar(key) {
      
      if (!this.props.isDisabled) {
         this.setState({
            voteSelected: key
         })
      }
      this.props.onHandleVote(key, this.props.question_number, this.clearState.bind(this))
   }

   clearState(){
      this.setState({
         voteSelected: null
      })
   }
   
   render() {
      
      var ratingList = ratingsList.map((rate, i) => {
         let isSelected = false;
         let noRate = false;
         if (!this.state.voteSelected) {
            noRate = true
         }

         if (rate._id == this.state.voteSelected) {
            isSelected = true
         }

         return <Star
           noRate={noRate}
           starId={rate._id}
           onClickStar={this.onClickStar.bind(this)}
           isSelected={isSelected}
           key={rate._id}
           rate={rate.group} />
      });

      return (
        <div className='rating'>
           <div className="question">
              <div>
                 <p> {this.props.question}</p>
              </div>
              {ratingList}
           </div>
        </div>
      )
   }

}


let ratingsList = [
   {_id: 1, group: 1},
   {_id: 2, group: 2},
   {_id: 3, group: 3}

];