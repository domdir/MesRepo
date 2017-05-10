import { errors } from '/both/errors/ErrorList'
import { throwError } from '/both/errors/ErrorManager'

Meteor.methods({
    'load_page': function (text) {
      Meteor.http.call("POST", 'http://localhost:8052/load_page'), {
           data: {
              "text": text
           }
        };
}
});
