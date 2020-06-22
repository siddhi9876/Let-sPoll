const express = require('express');
const Router = express.Router();
const passport = require('passport');
const router = require('./users');


//Load  models
const Profile = require('../../models/Profiles');
const Room = require('../../models/Rooms');


// @router GET api/rooms/test
// @desc Tests room route
// @access Publics
router.get('/', (req, res) => res.json({msg: "Rooms works"}));


// @router GET api/rooms/:room_id
// @desc Get current room
// @access private
router.get('/:roomId', passport.authenticate('jwt', {session: false}), (req, res) => {

  const errors = {};
  Profile.findOne({user: req.user.id}).then(profile => {

    if(profile) {
      
      if((profile.room_created.filter(troom => troom.roomId == req.params.roomId ).length === 0) && (profile.room_partOf.filter(troom => troom.roomId == req.params.roomId ).length === 0)) {
        errors.room = "Room doesnot belongs to you neither you are a Participant";
        return res.status(400).json(errors);
      }

      Room.findOne({_id: req.params.roomId}).then(room => {
        if(room) {
          return res.json(room);
        } else {
          errors.room = "Room not found";
          return res.status(400).json(errors);
        }
      })
    }
  })
})

// @router GET api/rooms/submit/:roomId
// @desc Get current room
// @access private
router.post('/submit/:roomId', passport.authenticate('jwt', {session: false}), (req, res) => {

  const errors = {};
  Profile.findOne({user: req.user.id}).then(profile => {

    if(profile) {
      
      if(profile.room_partOf.filter(troom => troom.roomId == req.params.roomId ).length === 0) {
        errors.room = "You are not a Participant";
        return res.status(400).json(errors);
      }

      Room.findOne({_id: req.params.roomId}).then(room => {
        if(room) {
          const currResponse = req.body.currResponse;
          if(!Array.isArray(currResponse) || (currResponse.length != room.maleCount)) {
            errors.room = "Response not valid";
            return res.status(400).json(errors);
          }

          for(var i = 0; i < room.maleCount; i++) {
            for(var j = 0; j < room.femaleCount; j++) {
              if(currResponse[i].localeCompare(room.females[j]) == 0) {
                room.maleArray[i][j].count++;
                room.femaleArray[j][i].count++;
              }
            }
          }

          var keys = [];
          var values = [];

          for(var i = 0; i < room.maleCount; i++) {
            //Copy Male Array and sort according to highest preference
            keys[i] = room.maleArray[i].slice();
            keys[i].sort(function(a, b) { return (b.count - a.count)});

            //Copy Female Array and sort according to higher preference
            values[i] = room.femaleArray[i].slice();
            values[i].sort(function(a, b) { return (b.count - a.count)});
          }

          
          var wPartner=[];
          var mPartner =[];
          var mFree = [];
          for(var i=0;i< room.maleCount;i++){
            wPartner.push(-1);
            mPartner.push(-1);
            mFree.push(false);
          }

          var freeCount = room.maleCount;
          
          while(freeCount > 0) {

            var currMale;
            for(currMale = 0; currMale < room.maleCount; currMale++){
              if(mFree[currMale] === false) break;
            }

            for(var f = 0; f < room.femaleCount && mFree[currMale] === false; f++) {
              var currFemale = keys[currMale][f].female;
              if(wPartner[currFemale] === (-1)) {
                wPartner[currFemale] = currMale;
                mPartner[currMale] = currFemale;
                mFree[currMale] = true;
                freeCount--;
                console.log(`${room.males[currMale]} : ${room.females[currFemale]}`);
                break;
              } else {
                var tempMale = wPartner[currFemale];
                var index_curr, index_temp;
                for(var index = 0; index < room.maleCount; index++) {
                  if(values[currFemale][index].male === currMale) index_curr = index;
                  if(values[currFemale][index].male === tempMale) index_temp = index;
                }

                if(index_curr < index_temp) {
                  wPartner[currFemale] = currMale;
                  mPartner[currMale] = currFemale;
                  mFree[currMale] = true;

                  mPartner[tempMale] = (-1);
                  mFree[tempMale] = false;
                  break;
                }
              }
            }

          }

          var results = [];
          for(var f = 0; f < room.femaleCount; f++) {
            results.push(room.females[mPartner[f]]);
          }

          
          //Updating Room
          room.currentResult = results;
          room.responseCount++;
          Room.findOneAndUpdate(
            {_id : room.id},
            {$set: room},
            {new : true}
          ).then(room => {
            if(room)
            {
              return res.json(room);
            }
            else {
              errors.room = "Room Not found Contact to the Owner";
              return res.status(400).json(errors);
            }
          }).catch(err => {
            errors.room = "Some error occured try again"
            return res.status(400).json(errors);
          })


        } else {
          errors.room = "Room not found";
          return res.status(400).json(errors);
        }
      })
    }
  })

})


module.exports = router;