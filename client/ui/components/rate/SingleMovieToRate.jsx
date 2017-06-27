/*
 *created with ♥ by Gianluca Chiap
 */

import React, { Component } from 'react'
import FiveStars from '/client/ui/components/rate/FiveStars.jsx'
export default class SingleMovieToRate extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            can_skip: null,
            start_date: null,
            votes: [],
           
        };
    }

    onHandleReport() {
        this.setState( { can_skip: 1 } );
        this.props.onHandleVote( -1, this.state.start_date, 1 );
    }



    componentDidMount() {
        const d = new Date();
        const s = d.getTime();
        this.setState( {
            start_date: s
        } )
    }

    render() {


        return (
            <div>

                <div className="movieToRateContainer">

                    {this.props.children}
                    <div className='videoToRate'>
                        <iframe className='videoFrame'
                            src={"https://www.youtube.com/embed/" + this.props.yt_url + '?autoplay=1'}
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>

                <div className="row" id="rate_sup">
                    {this.props.is_show_bottom_title ?
                        <h2><img className="iconInfoMovies2" src={"/images/film.png"}
                            title="Movie's Title" /> <span style={{ color: "white" }}>
                                {this.props.movie_title} <span style={{ fontSize: "16px" }}>({this.props.year})</span></span></h2>
                        : null}
                    <div>
                        {!this.props.is_already_voted
                            ?
                            <FiveStars isDisabled={false} onHandleVote={this.props.onHandleVote}
                                startDate={this.state.start_date} />
                            :
                            <div> {this.props.message}</div>
                        }
                        <div className="dropdown">
                            <button style={{marginRight: '200px', marginTop: '25px'}} className="btn btn-default dropdown-toggle dropdownMenu1" type="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <ul>?</ul>
                            </button>
                            <ul className="dropdown-menu" id="dropdown-menu1" aria-labelledby="dropdownMenu1">
                                <li>
                                    <a>
                                        If you note any problem with the video, please click the Report button!
                         </a>
                                </li>
                            </ul>
                        </div>
                        <button  className="btn btn-default button_ini button4_genre" onClick={this.onHandleReport.bind( this )}>REPORT</button>

                </div>
            </div> </div >
      )
    }
}
