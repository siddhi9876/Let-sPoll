const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const RoomSchema = new Schema({

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'profiles'
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
  },

  participants: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'profiles'
    },
    email: {
      type: String,
      required: true
    }
  }],

  maleCount: {
    type: Number,
    required: true
  },

  femaleCount: {
    type: Number,
    required: true
  },

  responseCount: {
    type: Number,
    required: true
  },

  males: {
    type: [String],
    required: true
  },

  females: {
    type: [String],
    required: true
  },

  maleArray: [[
    {
      female: {
        type: Number,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ]],

  femaleArray: [[
    {
      male: {
        type: Number,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ]],

  currentResult: {
    type: [String]
  }
});

module.exports = Room = mongoose.model('rooms', RoomSchema);