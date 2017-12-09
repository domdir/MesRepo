/**
 * Created with ♥ by giangi
 */


import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

Meteor.methods({
  s_get_n_final_movies: function(num_of_rec, recType="NONE"){
	  if(recType=="NONE"){
		  recType=currentUser.final_list
		  console.log(recType)
	  }
	  if (currentUser.final_rec) {
	      if (currentUser.final_rec.length) {
	        return
	      }
	    }
	  console.log("GET", "http://localhost:8052/get_"+recType+"_rec?" +
		      "num_of_rec=" + num_of_rec +
		      "&for_who=" + this.userId)
	  Meteor.http.call("GET", "http://localhost:8052/get_"+recType+"_rec?" +
      "num_of_rec=" + num_of_rec +
      "&for_who=" + this.userId,
		      (error, result) => {
		        if (error) {
		        	console.log(error)
		          //myFuture.throw("could not contact the server");
		        } else {


		          const movies = [];
		          for (let key in result.data) {
		            if (result.data.hasOwnProperty(key)) {
		              movies.push(JSON.parse(result.data[key]))
		            }
		          }

		          Meteor.users.update(
		            {
		              _id: this.userId
		            },
		            {
		              $set: {
		            	final_list: recType,
		                final_rec: movies
		              }
		            }
		          )
		        }

		      });
	  
  },
  s_get_n_rec_movies: function(...recType) {

    //this.unblock();


    currentUser = Meteor.users.findOne({
      _id: this.userId
    });

    if (currentUser.rec_movies.length) {

      return
    }

    Meteor.http.call("GET", "http://localhost:8052/get_rec?" +
      "rec_request_list=" + recType +
      "&for_who=" + this.userId,
      (error, result) => {
        if (error) {

          //myFuture.throw("could not contact the server");
        } else {


          const movies = [];
          for (let key in result.data) {
            if (result.data.hasOwnProperty(key)) {
              movies.push(JSON.parse(result.data[key]))
            }
          }

          Meteor.users.update(
            {
              _id: this.userId
            },
            {
              $set: {
                rec_movies: movies
              }
            }
          )
        }

      });
  },


  m_get_n_rec: function(num_of_rec) {
    currentUser = Meteor.users.findOne({
      _id: this.userId
    });

    if (currentUser.rec_movies.length) {
      return
    }

    const max = 5;
    const min = 0;
    const randRec = Math.floor(Math.random() * (max - min + 1) + min);
    let rec_type = "get_genre_rec";
    switch (randRec) {
      case 0:
      {
        rec_type = "get_tag_rec";
        break;
      }
      case 1:
      {
        rec_type = "get_genre_rec";
        break;
      }
      case 2:
      {
        rec_type = "get_audio_ivec_rec";
        break;
      }
      case 3:
      {
        rec_type = "get_audio_blf_rec";
	break;
      }
      case 4:
      {
        rec_type = "get_video_avf_rec";
        break;
      }
      case 5:
      {
        rec_type = "get_video_deep_rec";
        break;
      }
    }
    Meteor.http.call("GET", "http://localhost:8052/" + rec_type + "?" +
      "num_of_rec=" + num_of_rec +
      "&for_who=" + this.userId,
      (error, result) => {
        if (error) {

          //myFuture.throw("could not contact the server");
        } else {


          const movies = [];
          for (let key in result.data) {
            if (result.data.hasOwnProperty(key)) {
              movies.push(JSON.parse(result.data[key]))
            }
          }

          Meteor.users.update(
            {
              _id: this.userId
            },
            {
              $set: {
                rec_movies: movies
              }
            }
          )
        }

      });

  },

  s_clear_rec(){
    
    Meteor.users.update(
      {
        _id: this.userId
      },
      {
        $set: {
          final_rec: []
        }
      }
    )
  },

  s_get_n_tag_rec: function(numOfRec) {
    currentUser = Meteor.users.findOne({
      _id: this.userId
    });

    if (currentUser.tag_rec) {
      if (currentUser.tag_rec.length) {
        return
      }
    }

    Meteor.http.call("GET", "http://localhost:8052/get_tag_rec?" +
      "num_of_rec=" + numOfRec +
      "&for_who=" + this.userId,
      (error, result) => {
        if (error) {
        } else {
          const movies = [];
          for (let key in result.data) {
            if (result.data.hasOwnProperty(key)) {
              movies.push(JSON.parse(result.data[key]))
            }
          }

          Meteor.users.update(
            {
              _id: this.userId
            },
            {
              $set: {
                tag_rec: movies
              }
            }
          )
        }

      });
  },

  s_get_n_genre_rec: function(numOfRec) {


    currentUser = Meteor.users.findOne({
      _id: this.userId
    });

    if (currentUser.genre_rec) {
      if (currentUser.genre_rec.length) {
        return
      }
    }

    Meteor.http.call("GET", "http://localhost:8052/get_genre_rec?" +
      "num_of_rec=" + numOfRec +
      "&for_who=" + this.userId,
      (error, result) => {
        if (error) {
        } else {
          const movies = [];
          for (let key in result.data) {
            if (result.data.hasOwnProperty(key)) {
              movies.push(JSON.parse(result.data[key]))
            }
          }

          Meteor.users.update(
            {
              _id: this.userId
            },
            {
              $set: {
                genre_rec: movies
              }
            }
          )
        }

      });
  },

  s_get_n_feature_rec: function(numOfRec) {


    currentUser = Meteor.users.findOne({
      _id: this.userId
    });

    if (currentUser.feature_rec) {
      if (currentUser.feature_rec.length) {
        return
      }
    }

    Meteor.http.call("GET", "http://localhost:8052/get_feature_rec?" +
      "num_of_rec=" + numOfRec +
      "&for_who=" + this.userId,
      (error, result) => {
        if (error) {
        } else {

          const movies = [];
          for (let key in result.data) {

            if (result.data.hasOwnProperty(key)) {
              movies.push(JSON.parse(result.data[key]))
            }
          }
          
          Meteor.users.update(
            {
              _id: this.userId
            },
            {
              $set: {
                feature_rec: movies
              }
            }
          )
        }

      });
  },
  
  s_get_n_audio_rec: function(numOfRec) {

	 
	    currentUser = Meteor.users.findOne({
	      _id: this.userId
	    });

	    if (currentUser.audio_rec) {
	      if (currentUser.audio_rec.length) {
	    	  
	        return
	      }
	    }
	    
	    Meteor.http.call("GET", "http://localhost:8052/get_audio_rec?" +
	      "num_of_rec=" + numOfRec +
	      "&for_who=" + this.userId,
	      (error, result) => {
	        if (error) {
	        } else {

	          const movies = [];
	          for (let key in result.data) {

	            if (result.data.hasOwnProperty(key)) {
	              movies.push(JSON.parse(result.data[key]))
	            }
	          }
	          
	          Meteor.users.update(
	            {
	              _id: this.userId
	            },
	            {
	              $set: {
	                audio_rec: movies
	              }
	            }
	          )

	        }

	      }); 

	  },


  s_get_n_audio_ivec_rec: function(numOfRec) {

	 
	    currentUser = Meteor.users.findOne({
	      _id: this.userId
	    });

	    if (currentUser.audio_ivec_rec) {
	      if (currentUser.audio_ivec_rec.length) {
	    	  
	        return
	      }
	    }
	    
	    Meteor.http.call("GET", "http://localhost:8052/get_audio_ivec_rec?" +
	      "num_of_rec=" + numOfRec +
	      "&for_who=" + this.userId,
	      (error, result) => {
	        if (error) {
	        } else {

	          const movies = [];
	          for (let key in result.data) {

	            if (result.data.hasOwnProperty(key)) {
	              movies.push(JSON.parse(result.data[key]))
	            }
	          }
	          
	          Meteor.users.update(
	            {
	              _id: this.userId
	            },
	            {
	              $set: {
	                audio_ivec_rec: movies
	              }
	            }
	          )

	        }

	      }); 

	  },

  s_get_n_audio_blf_rec: function(numOfRec) {

	    currentUser = Meteor.users.findOne({
	      _id: this.userId
	    });

	    if (currentUser.audio_blf_rec) {
	      if (currentUser.audio_blf_rec.length) {	  
	        return
	      }
	    }

	    
	    Meteor.http.call("GET", "http://localhost:8052/get_audio_blf_rec?" +
	      "num_of_rec=" + numOfRec +
	      "&for_who=" + this.userId,
	      (error, result) => {
	        if (error) {
	        } else {

	          const movies = [];
	          for (let key in result.data) {

	            if (result.data.hasOwnProperty(key)) {
	              movies.push(JSON.parse(result.data[key]))
	            }
	          }

	          
	          Meteor.users.update(
	            {
	              _id: this.userId
	            },
	            {
	              $set: {
	                audio_blf_rec: movies
	              }
	            }
	          )

	        }

	      }); 

	  },

  s_get_n_video_avf_rec: function(numOfRec) {

	    currentUser = Meteor.users.findOne({
	      _id: this.userId
	    });

	    if (currentUser.video_avf_rec) {
	      if (currentUser.video_avf_rec.length) {
	    	  
	        return
	      }
	    }
	    
	    Meteor.http.call("GET", "http://localhost:8052/get_video_avf_rec?" +
	      "num_of_rec=" + numOfRec +
	      "&for_who=" + this.userId,
	      (error, result) => {
	        if (error) {
	        } else {

	          const movies = [];
	          for (let key in result.data) {

	            if (result.data.hasOwnProperty(key)) {
	              movies.push(JSON.parse(result.data[key]))
	            }
	          }

	          
	          Meteor.users.update(
	            {
	              _id: this.userId
	            },
	            {
	              $set: {
	                video_avf_rec: movies
	              }
	            }
	          )

	        }

	      }); 

	  },

  s_get_n_video_deep_rec: function(numOfRec) {

	 
	    currentUser = Meteor.users.findOne({
	      _id: this.userId
	    });

	    if (currentUser.video_deep_rec) {
	      if (currentUser.video_deep_rec.length) {
	    	  
	        return
	      }
	    }
	    
	    Meteor.http.call("GET", "http://localhost:8052/get_video_deep_rec?" +
	      "num_of_rec=" + numOfRec +
	      "&for_who=" + this.userId,
	      (error, result) => {
	        if (error) {
	        } else {

	          const movies = [];
	          for (let key in result.data) {

	            if (result.data.hasOwnProperty(key)) {
	              movies.push(JSON.parse(result.data[key]))
	            }
	          }

	          
	          Meteor.users.update(
	            {
	              _id: this.userId
	            },
	            {
	              $set: {
	                video_deep_rec: movies
	              }
	            }
	          )

	        }

	      }); 

	  }
});

