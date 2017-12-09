/*
 * Created with ♥ by Gianluca Chiap (@forgiangi)
 */

import React, { Component } from 'react';
import Questionnaire from './Questionnaire.jsx'
import RecList from './RecList.jsx';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import { createContainer } from 'meteor/react-meteor-data';

export default class RecQuestionnaireContainer extends Component {

    constructor( props ) {
        super( props );


        this.state = {
            is_loading: false,
            list_order: null,
            list1: null,
            list2: null,
            list3: null
        };
    }

    componentDidMount() {
    // create an array with 3 random recommenders. 1 from baseline, 1 from audio, 1 from video
    str_baseline_rec = ['tag', 'genre']
    str_audio_rec = ['audio_ivec', 'audio_blf']
    str_video_rec = ['video_avf', 'video_deep']
    var arr = Array.from({length: 3}, () => Math.round(Math.random() * 1))
    // take the selected recommenders
    str_rec = ['', '', '']
    str_rec[0] = str_baseline_rec[arr[0]];
    str_rec[1] = str_audio_rec[arr[1]];
    str_rec[2] = str_video_rec[arr[2]];
    // shuffle the recommendations
    for (let i = str_rec.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
        [str_rec[i], str_rec[j]] = [str_rec[j], str_rec[i]];
    }
    
        //set the recs name in the state
        this.setState( {
            list_order: str_rec
        } )

    // and call the recommenders
    for (let rec of str_rec){
        method = "s_get_n_" + rec + "_rec";
        Meteor.call(method, 4, (err,res) => {

        } );
    };
    }

    componentWillReceiveProps( nextProps ) {
        rec=["","",""]
    
        // if we have chosen the recommenders
        if (this.state.list_order) {
            str_rec = this.state.list_order;

            // and we received all the recommendations
            if (!this.state.list1 && nextProps[str_rec[0] + "_rec"] && nextProps[str_rec[1] + "_rec"] && nextProps[str_rec[2] + "_rec"] ) {

                //save them
                for (let i = str_rec.length -1; i >= 0; i--) {
                    rec[i] = nextProps[str_rec[i] + "_rec"];
                }

                this.setState( {
                    list1: rec[0],
                    list2: rec[1],
                    list3: rec[2],
                    list_order: str_rec
                } )

		//console.log("Inserted lists: " + this.state.list1 + this.state.list2 + this.state.list3 + this.state.list_order)
            }
            else {
                //run to see which rec lists is arrived and which is yet null
                //console.log("list_order=" + this.state.list_order);
		//for (var r of str_rec){
		//	console.log("Props: " + r + "_rec=" + nextProps[r + "_rec"]);
		//}
            } 
                
        }
    }

    renderRandomRec() {



        return (
            <div>
                <div className="row">
                    <RecList list_title={"List 1"} rec_type={this.state.list_order[0]} rec_movies={this.state.list1} />
                </div>
                <div className="row">
                    <RecList list_title={"List 2"} rec_type={this.state.list_order[1]} rec_movies={this.state.list2} />
                </div>
                <div className="row">
                    <RecList list_title={"List 3"} rec_type={this.state.list_order[2]} rec_movies={this.state.list3} />

                </div>

            </div> )

    }

    render() {
        if ( this.props.currentUser ) {

            if ( FlowRouter.current().params.ini_step != this.props.currentUser.ini_step ) {

                FlowRouter.go( "/ini/" + this.props.currentUser.ini_step )
            }
            if ( this.props.currentUser.is_ini ) {
                FlowRouter.go( "/profile" );
            }
        }
		if ( !this.state.list1 || !this.state.list2 || !this.state.list3){
			this.componentWillReceiveProps( this.props )
		}

        return (
            <div className="container-fluid questionnaire-page">
                <div className="col-md-7">
                    <h3>You can click on thumbnail to see the trailer.</h3>
                    {	
						this.state.list1 && this.state.list2 && this.state.list3 ?
                        <div className="questionnaire">
                            {this.renderRandomRec()}
                        </div>
                        : <LoadingItem loading_style="loader-bars" />}
                </div>

                <div className="col-md-5">
                    {this.state.list_order ?
                        <Questionnaire list_order={this.state.list_order} /> : <div></div>}
                </div>

            </div>
        )
    }
}

export default createContainer(() => {


    const handleUser = Meteor.subscribe( "pub_myself" );
    let currentUser = null;
    let tag_rec = null;
    let genre_rec = null;
    let audio_ivec_rec = null;
    let audio_blf_rec = null;
    let video_avf_rec = null;
    let video_deep_rec = null;
    if ( handleUser.ready() ) {
        currentUser = Meteor.user();
        if ( currentUser ) {
            tag_rec = currentUser.tag_rec;
	    genre_rec = currentUser.genre_rec;
            audio_ivec_rec = currentUser.audio_ivec_rec;
            audio_blf_rec = currentUser.audio_blf_rec;
	    video_avf_rec = currentUser.video_avf_rec;
	    video_deep_rec = currentUser.video_deep_rec;
        }


    }
    return {
        currentUser,
        tag_rec,
	genre_rec,
        audio_ivec_rec,
        audio_blf_rec,
	video_avf_rec,
	video_deep_rec
    };
}, RecQuestionnaireContainer )

