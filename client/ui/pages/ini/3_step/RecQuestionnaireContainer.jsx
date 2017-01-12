/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import Questionnaire from './Questionnaire.jsx'
import RecList from './RecList.jsx';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import { createContainer } from 'meteor/react-meteor-data';

export default class RecQuestionnaireContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      is_loading: false
    };
  }

  componentDidMount() {
    Meteor.call("s_get_n_tag_rec",
      4, (err, res)=> {

      });
    //Meteor.call("s_get_n_genre_rec",
    // 4, (err, res)=> {
    //});

    Meteor.call("s_get_n_feature_rec",
      4, (err, res)=> {

      });
  }

  renderRandomRec() {

    const hybridRed = [this.props.feature_rec[1], this.props.tag_rec[0], this.props.feature_rec[0], this.props.tag_rec[1]];
    return (
      <div>
        <div className="row">
          <RecList list_title={"List 1"} rec_movies={hybridRed} />
        </div>
        <div className="row">
          <RecList list_title={"List 2"} rec_movies={this.props.feature_rec} />
        </div>
        <div className="row">
          <RecList list_title={"List 3"} rec_movies={this.props.tag_rec} />

        </div>

      </div>)

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
      <div className="container-fluid questionnaire-page">
        <div className="col-md-7">
          <h3>You can click on thumbnail to see the trailer.</h3>
          {this.props.tag_rec && this.props.feature_rec ?
            <div className="questionnaire">
              {this.renderRandomRec()}
            </div>
            : <LoadingItem loading_style="loader-bars" />}
        </div>

        <div className="col-md-5">
          <Questionnaire />
        </div>

      </div>
    )
  }
}

export default createContainer(() => {


  const handleUser = Meteor.subscribe("pub_myself");
  let currentUser = null;
  let tag_rec = null;
  let genre_rec = null;
  let feature_rec = null;
  if (handleUser.ready()) {
    currentUser = Meteor.user();
    if (currentUser) {
      tag_rec = currentUser.tag_rec;
      genre_rec = currentUser.genre_rec;
      feature_rec = currentUser.feature_rec;
    }


  }
  return {
    currentUser,
    tag_rec,
    genre_rec,
    feature_rec
  };
}, RecQuestionnaireContainer)

