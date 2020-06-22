const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Validator
const validateProfileInput = require('../../validator/Profile');
const validateCreateRoomInput = require('../../validator/CreateRoom');

//Load Profile model
const Profile = require('../../models/Profiles');
const Room = require('../../models/Rooms');

// @router GET api/profiles/test
// @desc Tests post route
// @access Publics
router.get('/test', (req, res) => res.json({msg : 'Profiles worked'}));

// @router POST api/profiles/
// @desc Create or Edit user
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  const {errors, isValid} = validateProfileInput(req.body);


  //Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  //Create Profile fields
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.handle = req.body.handle;
  profileFields.email = req.user.email;
  profileFields.company = req.body.company;
  profileFields.room_created = []; 
  profileFields.room_partOf = [];

  Profile.findOne({user: req.user.id}).then(profile => {

    if(profile) {
      errors.user = "Profile already created can't be modified";
      return res.status(400).json(errors);
    } else {

      //Handle should be unique
      Profile.findOne({handle: req.body.handle})
        .then(profile => {

        if(profile) {
          errors.handle = "Handle already exists";
          return res.status(400).json(errors);
        } else {
           //Save profile
          new Profile(profileFields)
            .save()
            .then(profile => {
              return res.json(profile)
            }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));

    }
  }).catch(err => console.log(err));

});

// @router GET api/profiles/
// @desc Get profile of current user
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  Profile.findOne({user: req.user.id}).then(profile => {
    if(profile) {
      return res.json(profile);
    } else {
      const errors = {};
      errors.profile = 'Profile not exist, create profile first';
      return res.status(400).json(errors);
    }
  })
})


// @router POST api/profiles/create_room
// @desc Create Room
// @access Private
router.post('/createRoom', passport.authenticate('jwt', {session: false}), (req, res) => {

  let { errors, isValid }  = validateCreateRoomInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({user: req.user.id}).then(profile => {

    if(profile) {

      //Check for Room name to be unique
      Room.findOne({name: req.body.room_name}).then(room => {
        if(room) {
          errors.room = 'Room name already exists please choose another one';
          return res.status(400).json(errors);
        } else {

          //Create Room
          const roomFields = {};
          roomFields.name = req.body.name;
          roomFields.owner = req.user.id;
          roomFields.description = req.body.description;
          roomFields.participants = [];
          roomFields.males = req.body.males;
          roomFields.females = req.body.females;
          roomFields.maleCount = roomFields.males.length;
          roomFields.femaleCount = roomFields.maleCount;
          roomFields.responseCount = 0;

          //Create female array 
          let tempFemaleArray = [];
          for(var i = 0; i < roomFields.femaleCount; i++) {
            tempFemaleArray[i] = new Array(roomFields.maleCount)
            for(var j = 0; j < roomFields.maleCount; j++) {
              tempFemaleArray[i].push({
                male: j,
                count: 0
              })
            }
          }
          roomFields.femaleArray = tempFemaleArray;

          //Create male array
          let tempMaleArray = [];
          for(var i = 0; i < roomFields.maleCount; i++) {
            tempMaleArray[i] = new Array(roomFields.femaleCount);
            for(var j = 0; j < roomFields.femaleCount; j++) {
              tempMaleArray[i].push({
                female: j,
                count: 0
              })
            }
          }
          roomFields.maleArray = tempMaleArray;
          roomFields.currentResult = roomFields.females;


          //Save room to dataBase
          new Room(roomFields).save()
            .then(room => {

              const profileRoom = {};
              profileRoom.roomId = room.id;
              profileRoom.name = room.name;
              profileRoom.description = room.description;
              profile.room_created = profile.room_created.concat(profileRoom);


              //Append Room to profile of Owner
              Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profile},
                { new: true}
              ).then(newProfile => {
                return res.json(newProfile);
              })
            });

        }
      })
    }
  })
})

// @router POST api/profiles/addParticipant
// @desc Add Participant to a given room Object, email id
// @access Private
router.post('/addParticipant', passport.authenticate('jwt', {session: false}), (req, res) =>{

    const errors = {}
    Profile.findOne({user: req.user.id}).then(profile => {
      if(profile) {

        //Check if the user is owner of the Room
        if(profile.room_created.filter(troom => troom.roomId == req.body.room.id ).length === 0) {
          errors.room = "Room doesnot belongs to you So you cant add Participant";
          return res.status(400).json(errors);
        }


  
        //Check if profile of Participant exist or not
        Profile.findOne({email: req.body.participant}).then(participantProfile => {
          if(participantProfile) {

            //Add Participant to Room 
            Room.findOne({_id: req.body.room.id}).then(room => {
              console.log(room);
              if(room) {

                //If the participant is already added to the room
                if(room.participants.filter(temp => temp == participantProfile.id).length)
                {
                  return res.json({"msg": "Already Added"})
                }
                
                room.participants = room.participants.concat(participantProfile.id);
                Room.findOneAndUpdate(
                  { _id: req.body.room.id },
                  { $set: room},
                  { new: true}
                ).then(newRoom => {
                  console.log(newRoom)
                  if(newRoom){
                    //Add Room to profile of Participant
                    const participantRoom = {};
                    participantRoom.roomId = newRoom.id;
                    participantRoom.name = newRoom.name;
                    participantRoom.description = newRoom.description;
                    participantProfile.room_partOf = participantProfile.room_partOf.concat(participantRoom);
                    
                    Profile.findOneAndUpdate(
                      {email: req.body.participant },
                      { $set: participantProfile},
                      { new: true}
                    ).then(newProfile => {
                      return res.json({"msg": "Sucessfully added"});
                    })
                  }
                });   
              }
            })
          } else {
            errors.participantProfile = "Profile of this user doesnot Exist";
            return res.status(400).json(errors);
          }
        })
       

      }
    }).catch(err => console.log(errors));
})

module.exports = router;