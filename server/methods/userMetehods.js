/**
 * Created with ♥ by giangi
 */

import { Meteor } from 'meteor/meteor';

Meteor.methods({
   
   s_set_avatar: function (avatarId) {
      
      
      if (!this.userId) {
         return;
      }

      Meteor.users.update(
        {
           _id: this.userId
        },
        {
           $set: {
              avatar_id: avatarId
           }
        }
      )
   }
});