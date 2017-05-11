/*
 *created with ♥
 */

import React, { Component } from 'react'
import LoadingWrapper from '/client/ui/components/loading/LoadingWrapper.jsx'


export default class MovieThumbnail extends Component {
   constructor(props) {
      super(props);

      this.state = {
         is_selected: false,
         on_hover: false,
         onLoadImage: true,
		 timeTrailer: 0,
		 mouseOverTime: 0,
		 dateStartOver: null,
		 dateStartTrailer:null
      };
   }

   componentDidMount() {
      this.setState({
         is_loading: true
      });
   }
   handleImageErrored() {
      this.setState( {
         onLoadImage: false
      } )
   }

   handleImageLoaded() {
      this.setState( {
         onLoadImage: false
      } )
   }
   
   onClick() {
      if (this.props.is_selectable) {
         if (this.props.is_selected) {
            this.props.remove_movie_from_selected(this.props.movie)
         } else {
            this.props.add_movie_to_selected(this.props.movie)
         }
      } else {
         if (this.props.is_selected) {
            this.props.remove_movie_from_selected(this.props.movie)
         }else {
            this.props.open_modal(this.props.movie)
			if(this.props.checkTime){
			this.props.movieOn=true
			this.setState({
				dateStartTrailer: (new Date).getTime()
			});}
         }
      }
   }
   
   timeSpentOnTrailer(){
	   if(this.props.checkTime){
	   if (this.props.movieOn==false && this.state.dateStartTrailer!=null){
		   timeToAdd=(new Date).getTime()-this.state.dateStartTrailer
		   newTime=this.state.timeTrailer+timeToAdd/1000
		   this.setState({
				dateStartTrailer: null,
				timeTrailer: newTime
			});
			}
	   }
   }
   mouseIsOver(){
	   if(this.props.checkTime){
	   this.setState((prevState) =>{
			   return {
				dateStartOver: (new Date).getTime()
			   }
	   });}
   }
   mouseIsOut(){
	   if(this.props.checkTime){
	   if(this.state.dateStartOver!=null){
	   timeToAdd=(new Date).getTime()-this.state.dateStartOver
	   newTime=this.state.mouseOverTime+timeToAdd/1000
	   this.setState({
				dateStartOver: null,
				mouseOverTime: newTime
			});
	   }
	   }
   }

   render() {
	   this.props.timeTrailer=this.state.timeTrailer
	   this.props.mouseOverTime=this.state.mouseOverTime
	   this.timeSpentOnTrailer()
      return (
        <div className="thumbnail" id={!this.props.is_selected ? "thumbmovies":  "thumbmovies-selected"}
             onClick={this.onClick.bind(this)} >
           <div className="caption" id="captionthumb">
              <img id="thumbMoviesDimension" onMouseOver={this.mouseIsOver.bind(this)} onMouseOut={this.mouseIsOut.bind(this)} title={this.props.title}
                   src={"http://localhost:8052/get_img?imdb_id="+this.props.movie.IMDB_ID}
                   onLoad={this.handleImageLoaded.bind(this)}
                   onError={this.handleImageErrored.bind(this)}/>
           </div>
        </div>
                   
      )
   }
}
