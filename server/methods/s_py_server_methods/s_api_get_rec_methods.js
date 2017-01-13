/**
 * Created with ♥ by giangi
 */


import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

Meteor.methods({

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

    const max = 3;
    const min = 1;
    const randRec = Math.floor(Math.random() * (max - min + 1) + min);
    let rec_type = "get_genre_rec";
    switch (randRec) {
      case 1:
      {
        rec_type = "get_tag_rec";
        break;
      }
      case 2:
      {
        rec_type = "get_genre_rec";
        break;
      }
      case 3:
      {
        rec_type = "get_feature_rec";

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
          feature_rec: []
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
  }


});

