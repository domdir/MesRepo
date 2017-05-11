import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

Meteor.methods({
   
    'get_json_movie_by_image': function (image) {
      r = Meteor.http.call("POST", 'http://localhost:8052/get_json_movie_by_image', {
           data: {
              "img": image
           }
        });
      return r['data'];
}
});


