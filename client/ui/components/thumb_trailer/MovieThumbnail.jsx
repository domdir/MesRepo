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
         onLoadImage: true

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
         }
      }
   }


   render() {


      return (
        <div className="thumbnail" id={!this.props.is_selected ? "thumbmovies":  "thumbmovies-selected"}
             onClick={this.onClick.bind(this)}>
           <div className="caption" id="captionthumb">
              <img id="thumbMoviesDimension" title={this.props.movie.TITLE}
                   src={"http://recmusicapiopenshift-obscuretest.rhcloud.com/get_img?imdb_id="+this.props.movie.IMDB_ID}
                   onLoad={this.handleImageLoaded.bind(this)}
                   onError={this.handleImageErrored.bind(this)}/>
           </div>

        </div>
      )
   }
}
