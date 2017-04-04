import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

Meteor.methods({
   
    'get_json_img': function (image) {
      r = Meteor.http.call("POST", 'http://localhost:8052/get_json_img', {
           data: {
              "img": image
           }
        });

      return r['data'];
}
});
