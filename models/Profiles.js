const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema ({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  email: {
    type: String
  },

  handle:{
    type: String,
    required: true,
    max: 40
  },

  company:{
    type: String,
    required: true
  },

  room_created: [
    {
       roomId: {
          type: Schema.Types.ObjectId,
          ref: 'rooms'
       },
     /*  TODO
     status: {
         type: Boolean,

       }
      */
       name: {
         type: String,
         required: true
       },

       description: {
          type: String,
          required: true
       }
    }
  ],

  room_partOf: [
    {
       roomId: {
          type: Schema.Types.ObjectId,
          ref: 'rooms'
       },
       name: {
         type: String,
         required: true
       },

       description: {
          type: String,
          required: true
       }
    }
  ]
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema);