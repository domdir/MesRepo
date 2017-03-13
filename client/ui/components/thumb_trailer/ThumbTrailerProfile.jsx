/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react'
import LoadingWrapper from '/client/ui/components/loading/LoadingWrapper.jsx'
import Heart from '/client/ui/components/thumb_trailer/Heart.jsx'
export default class ThumbTrailerProfile extends Component {
   constructor(props) {
      super(props);

      this.state = {
         is_selected: false,
         on_hover: false,
         show_trailer: false
      };
   }

   componentDidMount() {
      this.setState({
         is_loading: true,
         onLoadImage: true

      });
   }


   truncateString(str) {
      if (str.length >= 19) {
         return str.substring(0, 19) + "...";
      } else {

         return str
      }
   }


   onHandleClick() {
      this.props.onClickMovie(this.props.movie)
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

   renderHearts() {
      const hearts = [];
      for (i = 0; i < this.props.rate; i++) {
         hearts.push("*");
      }
      return hearts.map((heart, i)=> {
         return <Heart key={i} />
      });

   }

   render() {

      return (
        <div className="thumbnail thumbmovies_profile" onClick={this.onHandleClick.bind(this)}>
           <div className="caption" id="captionthumb" title={this.props.movie_title}>
              <img id="thumbMoviesDimension2"
                   src={"http://localhost:8052/get_img?imdb_id="+this.props.imdb_id}
                   onLoad={this.handleImageLoaded.bind(this)}
                   onError={this.handleImageErrored.bind(this)}/>
              <p className="thumbDescription">Title: {this.truncateString(this.props.movie_title)}</p>
              <ul className="list-inline heartRate"> Your rate: &nbsp;
                 {this.renderHearts()}
              </ul>
           </div>
        </div>
      )
   }
}
