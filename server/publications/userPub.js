/**
 * Created with ♥ by giangi
 */

Meteor.publish('pub_myself', function () {

   if (!this.userId) {
      this.ready();
   }

   return Meteor.users.find(
     {
        _id: this.userId
     },
     {
        fields: {
           'is_auth': 1,
           'is_ini': 1,
           'ini_step': 1,
           'role': 1,
           'user_name': 1,
           'ini_movies': 1,
           'avatar_id':1,
           'fav_genres':1,
           'rec_movies':1,
           
           'tag_rec':1,
	   'audio_ivec_rec':1,
	   'audio_blf_rec':1,
           /*'genre_rec':1,
           'feature_rec':1,
           'audio_rec':1,*/
           'final_rec':1
        }
     }
   );
});
