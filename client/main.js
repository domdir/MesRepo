import React from 'react';
import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
  Meteor.subscribe("pub_myself")
});

