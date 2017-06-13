/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import GenreThumbnail from './GenreThumbnail.jsx'
import { createContainer } from 'meteor/react-meteor-data';

export default class ChooseOneGenre extends Component {

   constructor(props) {
      super(props);
      this.add_genre_to_selected = this.add_genre_to_selected.bind(this);
      this.remove_genre_from_selected = this.remove_genre_from_selected.bind(this);
      this.state = {
         is_loading: false,
         genre_selected: null,
         error: null,
		date_load: null
        };
    }
	
	componentDidMount() {
	this.setState({
		date_load: (new Date).getTime()
	});
  }
  componentWillUnmount() {
	   pageTime= ((new Date).getTime()-this.state.date_load)/1000
	   Meteor.call("update_page","Ini0Page",pageTime)
  }

   add_genre_to_selected(genre_name) {
      this.setState({
         genre_selected: genre_name
      });
   }

   remove_genre_from_selected(genre_name) {
      if (genre_name == this.state.genre_selected) {
         this.setState({
            genre_selected: null
         });
      }
   }

   renderGenres() {

      const genres = [];
      for (key in genres_list) {
         if (genres_list.hasOwnProperty(key)) {
            genres.push(genres_list[key])
         }
      }
      return genres.map((genre, i)=> {
         const is_selected = this.state.genre_selected == genre.name;

         return <GenreThumbnail
           key={i}
           genre_name={genre.name}
           src={genre.img}
           is_selected={is_selected}
           add_genre_to_selected={this.add_genre_to_selected}
           remove_genre_from_selected={this.remove_genre_from_selected} />
      })
   }

   onHandleNext() {
	   pageTime= ((new Date).getTime()-this.state.date_load)/1000
	   window.scrollTo(0, 0)
      if (this.state.genre_selected) {
         Meteor.call("s_save_genres", [this.state.genre_selected], (err, res)=> {
            if (!err) {
               Meteor.call("s_set_ini_step", 1,pageTime, err=> {
                  if (!err) {
                     FlowRouter.setParams({ini_step: "1"});
                  }
               })
            }
         });
      }
   }

   render() {
      title = "CHOOSE YOUR FAVORITE GENRE";

      if (this.state.genre_selected) {
         title = " Thank you, press next "
      }
      if (this.props.currentUser) {
         
         if (FlowRouter.current().params.ini_step != this.props.currentUser.ini_step) {
            
            FlowRouter.go("/ini/"+this.props.currentUser.ini_step)
         }
         if(this.props.currentUser.is_ini){
            FlowRouter.go("/profile");
         }
      }

      return (
        <div>
           <div className='jumbotron' id="jumbostart">
              <h1 className="text-center">W E L C O M E </h1>
              <div className="text-center">
                 {!this.state.genre_selected ? <div className="choose_genre"><span
                   style={{color: "#FFFFFF", fontFamily: 'MESFont5, sans-serif', fontSize: '20px', textTransform: 'uppercase'}}>
                       {title}</span></div>
                   : <button onClick={this.onHandleNext.bind(this)}
                             className="btn btn-default button_ini">N E X T</button>}
              </div>
           </div>

           <div className="row">

              <div className="modalgenre">
                 {this.renderGenres()}
              </div>
              {this.state.error ? <div className="jumbotron">
                 <h1> {this.state.error}</h1>
              </div> : null}
           </div>
        </div>
      )
   }
}
export default createContainer( () => {

   const handleUser = Meteor.subscribe( "pub_myself" );
   let currentUser = null;
   if (handleUser.ready()) {
      currentUser = Meteor.user();
   }
   return {
      currentUser
   };
}, ChooseOneGenre );



const genres_list = {
   'ACTION': {"name": 'Action', "img": 'action.png'},
   'ADVENTURE': {"name": 'Adventure', "img": 'adventure.png'},
   'ANIMATION': {"name": 'Animation', "img": 'animation.png'},
   'CHILDREN': {"name": 'Children', "img": 'children.png'},
   'COMEDY': {"name": 'Comedy', "img": 'comedy.png'},
   'CRIME': {"name": 'Crime', "img": 'crime.png'},
   'DOCUMENTARY': {"name": 'Documentary', "img": 'documentary.png'},
   'DRAMA': {"name": 'Drama', "img": 'drama.png'},
   'FANTASY': {"name": 'Fantasy', "img": 'fantasy.png'},
   'HORROR': {"name": 'Horror', "img": 'horror.png'},
   'MUSICAL': {"name": 'Musical', "img": 'musical.png'},
   'ROMANCE ': {"name": 'Romance', "img": 'romance.png'},
   'SCIFI': {"name": 'SciFi', "img": 'scifi.png'},
   'THRILLER': {"name": 'Thriller', "img": 'thriller.png'},
   'WESTERN': {"name": 'Western', "img": 'western.png'},
};