/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';

export default class InfoFeatures extends Component {

   constructor( props ) {
      super( props );

      this.state = {};
   }
   
   convertValue( value ) {
      if (value <= 1 / 5) {
         return "very low"
      } else if (value <= 2 / 5) {
         return "low"
      } else if (value <= 3 / 5) {
         return "medium"
      } else if (value <= 4 / 5) {
         return "high"
      } else if (value <= 5 / 5) {
         return "very high"
      }
   };

   render() {
      let genres = "";

      let f1 = this.convertValue( this.props.f1 ).toUpperCase();
      
      switch (f1) {
         case "VERY LOW":
         {
            f1 = "VERY HIGH";
            break
         }
         case "LOW":
         {
            f1 = "HIGH";
            break
         }
         case "MEDIUM":
         {
            f1 = "MEDIUM";
            break
         }
         case "HIGH":
         {
            f1 = "LOW";
            break
         }
         case "VERY HIGH":
         {
            f1 = "VERY LOW";
            break
         }
      }
      

      this.props.genre.forEach( ( genre, i )=> {
         if (i == this.props.genre.length - 1) {
            genres += genre
         } else {
            genres += genre + " | "
         }
      } );


      return (
        <div className="infoMovie">
           {/* how fast is the movie speed of change in the camera*/}
           {/* spedd in the movement of the object*/}

           <div className="dropdown">
              <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

                 <ul><img className="iconInfoMovies" src={"/features_icon/moviegenre.png"}
                          title="Movie's genre" /> {genres}
                 </ul>

              </div>
              <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="dropdownMenu1">
                 <li>
                    <a>
                       Movie's genre
                    </a>
                 </li>
              </ul>

           </div>
           <div className="dropdown">
              <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

                 <ul><img className="iconInfoMovies" src={"/features_icon/cornermotion.png"}
                          title="The length of the scenes in the movie" /> {f1}
                 </ul>

              </div>
              <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="dropdownMenu1">
                 <li>
                    <a>
                       The length of the scenes in the movie
                    </a>
                 </li>
              </ul>

           </div>
           <div className="dropdown">
              <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

                 <ul><img className="iconInfoMovies" src={"/features_icon/colorvariance.png"}
                          title="Variation of colors in the movie" /> {this.convertValue( this.props.f2 )}
                 </ul>

              </div>
              <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="dropdownMenu1">
                 <li>
                    <a>
                       Variation of colors in the movie
                    </a>
                 </li>
              </ul>

           </div>
           <div className="dropdown">
              <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

                 <ul><img className="iconInfoMovies" src={"/features_icon/objectmotion.png"}
                          title="Speed of the objects in the movie." /> {this.convertValue( this.props.f4 )}
                 </ul>

              </div>
              <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="dropdownMenu1">
                 <li>
                    <a>
                       Speed of the objects in the movie.
                    </a>
                 </li>
              </ul>

           </div>

           <div className="dropdown">
              <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">

                 <ul><img className="iconInfoMovies" src={"/features_icon/lightening.png"}
                          title="Lightening of the movie." /> {this.convertValue( this.props.f6 )}
                 </ul>

              </div>
              <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="dropdownMenu1">
                 <li>
                    <a>
                       Lightening of the movie.
                    </a>
                 </li>
              </ul>

           </div>
           <div className="dropdown">
              <button className="btn btn-default dropdown-toggle dropdownMenu1" type="button"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                 <ul>?</ul>
              </button>
              <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="dropdownMenu1">
                 <li>
                    <a>
                       Click or hover the icon to know more about it.
                    </a>
                 </li>
              </ul>

           </div>
        </div>
      )
   }
}
