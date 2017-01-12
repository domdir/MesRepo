/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'

export default class GenreThumbnail extends Component {

   constructor( props ) {
      super( props );

      this.state = {
         onLoadImage: true
      };
   }

   onClick() {
      if (this.props.is_selected) {
         this.props.remove_genre_from_selected( this.props.genre_name )
      } else {
         this.props.add_genre_to_selected( this.props.genre_name )
      }
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

   render() {
      let className = "caption caption-normal";
      if (this.props.is_selected) {
         className += " selected"
      }
      let classNameImg = " genre";
      if (this.props.is_small) {
         classNameImg += " small";
         className += " my-thumb-small"

      }
      return (
        <div className="thumbnail thumbGenre" onClick={this.onClick.bind(this)}>
           <div className={className}>
              <div>{this.state.onLoadImage ? <LoadingItem loading_style="loader-spinning" /> : null}</div>
              <img className={classNameImg}
                   src={"/genre/"+this.props.src}
                   onLoad={this.handleImageLoaded.bind(this)}
                   onError={this.handleImageErrored.bind(this)} />
              <p>{this.props.genre_name}</p>
           </div>
        </div>
      )
   }
}