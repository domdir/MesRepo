/*
 *created with ♥
 */
/*
 *created with ♥
 */
import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import LoadingItem from '/client/ui/components/loading/LoadingItem.jsx'
import ThumbTrailerProfile from '/client/ui/components/thumb_trailer/ThumbTrailerProfile.jsx'
import SingleMovieToRate from '/client/ui/components/rate/SingleMovieToRate.jsx'
import InfoFeatures from '/client/ui/components/info_features/InfoFeatures.jsx'
import Avatar from '/client/ui/components/avatar/Avatar.jsx'
import { routesPath, routesParam } from '/client/router/router';


import Modal from 'react-modal';

export default class ProfilePage extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         limit: 10,
         trailers: [],
         is_loading: false,
         errors: null,
         is_load_more: true,
         is_loading_more: false,
         modalIsOpen: false,
         movie_selected: null,
         modalAvatarIsOpen: false


      };
   }

   componentDidMount() {

      this.setState({
         is_loading: true
      });
      Meteor.call("s_get_trailer_rated_by_me", this.state.limit, (err, res)=> {

         this.setState({
            is_loading: false
         });

         if (!err) {

            this.setState({
               trailers: res
            })
         } else {
            this.setState({
               error: err.reason
            })
         }
      })
   }

   renderTrailersSeen() {
      return this.state.trailers.map((trailer, i)=> {
         const t = JSON.parse(trailer);
         return <ThumbTrailerProfile
           movie={t}
           poster={t.POSTER}
           key={i}
           imdb_id={t.IMDB_ID}
           rate={t.user_rate}
           movie_title={t.TITLE}
           onClickMovie={this.onMovieSelect.bind(this)} />
      })
   }

   onMovieSelect(movie) {


      this.setState({
         movie_selected: movie,
         modalIsOpen: true
      });
   }

   closeModalAvatar() {
      this.setState({
         modalAvatarIsOpen: false
      });
   }

   logout() {
	   pageTime= ((new Date).getTime()-this.state.date_load)/1000
	   Meteor.call("update_page","RecForYouPage",pageTime)
	   Meteor.logout((err)=> {
         if (!err) {
            FlowRouter.go("/")
         }
      })
   }

   onLoadMore() {


      this.setState({
         is_loading_more: true
      });

      Meteor.call("s_get_trailer_rated_by_me", this.state.limit + 10, (err, res)=> {

         this.setState({
            is_loading_more: false
         });

         if (!err) {

            if (res.length < this.state.limit + 10) {

               this.setState({
                  is_load_more: false
               })
            }


            this.setState({
               trailers: res,
               limit: this.state.limit + 10
            })

         } else {
            this.setState({
               error: err.reason
            })
         }
      })
   }

   closeModal() {
      this.setState({modalIsOpen: false});
   }

   openChooseAvatar() {
      this.setState({modalAvatarIsOpen: true});

   }

   renderAvatars() {
      
      return avatarsId.map(avatarId=> {
         
         let isSelected = false;
         if (this.props.currentUser.avatar_id == avatarId) {
            isSelected = true;
         }

         return <Avatar key={avatarId}
                        is_selected={isSelected}
                        avatar_id={avatarId}
                        img_src={"/avatar_img/"+avatarId+".png"} />
      })
   }
   componentWillReceiveProps(){
      this.setState({modalAvatarIsOpen: false});
   }

   renderPage() {
      if (this.props.currentUser) {

         if (this.props.currentUser.ini_step!=5) {
            FlowRouter.go("/ini/"+this.props.currentUser.ini_step)
         }
      }

      const customStyles = {
         overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: '40'
         },
         content: {
            position: 'absolute',
            top: '90px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '0px',
            background: 'black',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '20px',
            color: 'white'
         }
      };

      const customStylesModalAvatar = {
         overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: '40'
         },
         content: {
            position: 'absolute',
            top: '90px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '0px',
            background: 'black',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '0px',
            outline: 'none',
            padding: '20px',
            color: 'white'
         }
      };

      let genres = null;
      if (this.state.movie_selected) {
         genres = this.state.movie_selected.GENRES.split("|");

      }
      return (
        <div>
           <div className="jumbotron" id={"jumbopersonal"+this.props.currentUser.avatar_id}>
              <div className="container_name">
                 {/*<h1 className="text-center">
                  {this.props.currentUser.user_name}</h1>*/}
              </div>
           </div>

           <div className="profileImg" onClick={this.openChooseAvatar.bind(this)}>
              <img id="profilePos" src={'/avatar_img/'+this.props.currentUser.avatar_id+'.png'} />
           </div>

           <div className="thumbnail tuhmbnailp" id="thumb-personal">
              <div className="caption" id="userinfo">
                 <ul>
                    <h2>P E R S O N A L &nbsp; I N F O</h2>
                    <p><b>name :</b> &nbsp;{this.props.currentUser.user_name}</p>
                    <p><b>email :</b> &nbsp;{this.props.currentUser.emails[0].address}</p>
                    <button id="buttonLogOut" onClick={this.logout.bind(this)}>LOG OUT</button>
                 </ul>
              </div>
           </div>

           <div className="container" id="container_mes">
              <div className="col-md-12">
                 <h2>M O V I E S &nbsp; R A T E D </h2>
                 {!this.state.is_loading ? this.renderTrailersSeen() :
                   <LoadingItem loading_style="loader-spinning" />}
                 <div>
                    {this.state.is_load_more ?
                      <div>
                         {!this.state.is_loading_more
                           ? <button onClick={this.onLoadMore.bind(this)} id="loadmore">LOAD MORE</button>
                           : <LoadingItem loading_style="loader-bars" /> }
                      </div> : <div className="row"><br /><br /></div>}
                 </div>
              </div>


              <Modal
                isOpen={this.state.modalAvatarIsOpen}
                style={customStylesModalAvatar}
                onRequestClose={this.closeModalAvatar.bind(this)}>

                 <div className="closeModal" onClick={this.closeModalAvatar.bind(this)}>x</div>
                 {this.state.modalAvatarIsOpen ?
                   <div className='jumbotron'>
                      <h1 className="text-center">A V A T A R</h1>
                      <h2 className="text-center">
                    <span style={{color: "#FFFFFF", fontFamily: 'MESFont3, sans-serif'}}>
                        Choose your favorite avatar</span></h2>
                      <br />
                      <br />
                      <div className="row">
                         <ul className="list-inline">
                            {this.renderAvatars()}
                         </ul>
                      </div>
                   </div>
                   : null}
              </Modal>

              <Modal
                isOpen={this.state.modalIsOpen}
                style={customStyles}
                onRequestClose={this.closeModal.bind(this)}>
                 <div className="closeModal" onClick={this.closeModal.bind(this)}>x</div>
                 {this.state.movie_selected ?
                   <div className="movie_modal">
                      <SingleMovieToRate
                        imdb_id={this.state.movie_selected.IMDB_ID}
                        poster_img={this.state.movie_selected.POSTER}
                        is_already_voted={true}
                        is_show_bottom_title={false}
                        genres={this.state.movie_selected.GENRES}
                        imdb_rating={this.state.movie_selected.IMDB_RATING}
                        yt_url={this.state.movie_selected.YOU_TUBE_ID}
                        can_skip={false}
                        message="YOU HAVE ALREADY VOTED THIS MOVIE"
                        movie_title={this.state.movie_selected.TITLE}
                        year={this.state.movie_selected.YEAR}>

                         <InfoFeatures
                           title={this.state.movie_selected.TITLE}
                           genre={genres}
                           f1={this.state.movie_selected.f1.toFixed(2)}
                           f2={this.state.movie_selected.f2.toFixed(2)}
                           f4={this.state.movie_selected.f4.toFixed(2)}
                           f6={this.state.movie_selected.f6.toFixed(2)} />
                      </SingleMovieToRate>
                   </div> : null}
              </Modal>

           </div>
        </div>
      )
   }

   render() {
      return (
        <div>
           {this.props.currentUser ?
             this.renderPage()
             : <LoadingItem loading_style="loader-spinning" />}
        </div>

      )
   }
}

export default createContainer(() => {

   

   const handleUser = Meteor.subscribe("pub_myself");
   let currentUser = null;
   let isReady = false;
   if (handleUser.ready()) {
      isReady = true;
      currentUser = Meteor.user();

   }
   FlowRouter.watchPathChange();
   return {
      currentUser,
      isReady
   };
}, ProfilePage);

let avatarsId = ["1", "2", "3", "4"];
