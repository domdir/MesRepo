/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Choose4Movie from './Choose4Movies.jsx'
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'

export default class ChooseMovieContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  renderMovie() {

    return <Choose4Movie genre={this.props.fav_genre} />
  }


  render() {
    if (this.props.currentUser) {

      if (FlowRouter.current().params.ini_step != this.props.currentUser.ini_step) {

        FlowRouter.go("/ini/" + this.props.currentUser.ini_step)
      }
      if (this.props.currentUser.is_ini) {
        FlowRouter.go("/profile");
      }
    }

    return (
      <div>
        {this.props.fav_genre ? this.renderMovie()
          : <LoadingItem loading_style="loader-spinning" />}
      </div>
    )
  }
}


export default createContainer(() => {

  const handleUser = Meteor.subscribe("pub_myself");
  let currentUser = null;
  let fav_genre = null;
  if (handleUser.ready()) {
    currentUser = Meteor.user();

    if (currentUser) {

      fav_genre = currentUser.fav_genres[0];

    }

  }

  return {
    currentUser,
    fav_genre
  };
}, ChooseMovieContainer);