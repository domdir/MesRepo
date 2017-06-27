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
        //create an array(rec) with 2 random rec and the tag_rec in random order
        str_fixed_rec = 'tag'
        str_others_rec = ['feature', 'audio', 'hybridRed']
        // create an array with 2 numbers between 1 and the number of others_rec (=3) to select 2 random recs
        var arr = []
        while ( arr.length < 2 ) {
            var randomnumber = Math.ceil(( Math.random() * str_others_rec.length ) - 1 )
            if ( arr.indexOf( randomnumber ) > -1 ) continue;
            arr[arr.length] = randomnumber;
        }
        //take the selected at random 2 rec 
        str_rec1 = str_others_rec[arr[0]];
        str_rec2 = str_others_rec[arr[1]];
        //create an array with 3 element between 1 and 3 in random order
        var arr = []
        while ( arr.length < 3 ) {
            var randomnumber = Math.ceil( Math.random() * str_others_rec.length )
            if ( arr.indexOf( randomnumber ) > -1 ) continue;
            arr[arr.length] = randomnumber;
        }
        str_rec = ['', '', '']
        //put the recs  in two arrays according to the random array just created
        str_rec[arr.indexOf( 1 )] = str_rec1
        str_rec[arr.indexOf( 2 )] = str_rec2
        str_rec[arr.indexOf( 3 )] = str_fixed_rec
        //set the recs name in the state
        this.setState( {
            list_order: str_rec
        } )
        
        Meteor.call( "s_get_n_tag_rec",
            4, ( err, res ) => {

            } );
        //Meteor.call("s_get_n_genre_rec",
        // 4, (err, res)=> {
        //});

        Meteor.call( "s_get_n_feature_rec",
            4, ( err, res ) => {

            } );
        Meteor.call( "s_get_n_audio_rec",
            4, ( err, res ) => {

            } );
    }

    componentWillReceiveProps( nextProps ) {
        rec=["","",""]
        //if we have all the rec_list in the new props
        if ( nextProps.tag_rec && nextProps.feature_rec && nextProps.audio_rec && this.state.list_order ) {
            str_rec = this.state.list_order
            //create the fixed hybrid list
            const hybridRed = [nextProps.feature_rec[1], nextProps.audio_rec[0], nextProps.feature_rec[0], nextProps.audio_rec[1]];

            switch ( str_rec[0] ) {
                case ( 'tag' ):
                    rec[0] = nextProps.tag_rec
                    break;
                case ( 'feature' ):
                    rec[0] = nextProps.feature_rec
                    break;
                case ( 'audio' ):
                    rec[0] = nextProps.audio_rec
                    break;
                case ( 'hybridRed' ):
                    rec[0] = hybridRed
                    break;
            }
            switch ( str_rec[1] ) {
            case ( 'tag' ):
                rec[1] = nextProps.tag_rec
                break;
            case ( 'feature' ):
                rec[1] = nextProps.feature_rec
                break;
            case ( 'audio' ):
                rec[1] = nextProps.audio_rec
                break;
            case ( 'hybridRed' ):
                rec[1] = hybridRed
                break;
        }
            switch ( str_rec[2] ) {
            case ( 'tag' ):
                rec[2] = nextProps.tag_rec
                break;
            case ( 'feature' ):
                rec[2] = nextProps.feature_rec
                break;
            case ( 'audio' ):
                rec[2] = nextProps.audio_rec
                break;
            case ( 'hybridRed' ):
                rec[2] = hybridRed
                break;
        }
            
            this.setState( {
                list1: rec[0],
                list2: rec[1],
                list3: rec[2],
                list_order: str_rec
            } )
        }
        else {
            //run to see which rec lists is arrived and which is yet null
            //console.log("list_order"+this.state.list_order+"tag_rec=" + this.props.tag_rec +"audio_rec=" + this.props.audio_rec +"feature_rec=" + this.props.feature_rec  )
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
		if(this.props.tag_rec && this.props.feature_rec && this.props.audio_rec && this.state.list_order 
		&& !this.state.list1 || !this.state.list2 || !this.state.list3){
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
    let feature_rec = null;
    let audio_rec = null;
    if ( handleUser.ready() ) {
        currentUser = Meteor.user();
        if ( currentUser ) {
            tag_rec = currentUser.tag_rec;
            genre_rec = currentUser.genre_rec;
            feature_rec = currentUser.feature_rec;
            audio_rec = currentUser.audio_rec;
        }


    }
    return {
        currentUser,
        tag_rec,
        genre_rec,
        feature_rec,
        audio_rec
    };
}, RecQuestionnaireContainer )

