/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react'
import FiveStars from '/client/ui/components/rate/FiveStars.jsx'
export default class SingleMovieToRate extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         start_date: null,
         votes:[]
      };
   }

   onHandleSkip() {
      this.props.onHandleVote(-1, this.state.start_date)
   }

   componentDidMount() {
      const d = new Date();
      const s = d.getTime();
      this.setState({
         start_date: s
      })
   }

   render() {


      return (
        <div>

           <div className="movieToRateContainer">

              {this.props.children}
              <div className='videoToRate'>
                 <iframe className='videoFrame'
                         src={"https://www.youtube.com/embed/"+this.props.yt_url+'?autoplay=1'}
                         frameBorder="0"
                         scrolling="no"
                         allowFullScreen>
                 </iframe>
              </div>
           </div>

           <div className="row" id="rate_sup">
              {this.props.is_show_bottom_title ?
                <h2><img className="iconInfoMovies2" src={"/images/film.png"}
                         title="Movie's Title" /> <span style={{color:"white"}}>
                       {this.props.movie_title} <span style={{fontSize:"16px"}}>({this.props.year})</span></span></h2>
                : null}
              <div>
                 {!this.props.is_already_voted
                   ?
                   <FiveStars isDisabled={false} onHandleVote={this.props.onHandleVote}
                              startDate={this.state.start_date} />
                   :
                   <div> {this.props.message}</div>
                 }
              </div>

              {this.props.can_skip ?
                <button className='button_skip' onClick={this.onHandleSkip.bind(this)}>NOT SEEN</button>
                : null}
           </div>
        </div>
      )
   }
}
