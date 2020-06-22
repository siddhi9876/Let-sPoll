const Validator = require('validator');
const isEmpty = require('./is_empty');


module.exports = function validateCreateRoomInput (data) {

  let errors = {};
  console.log(data);
  console.log(typeof(data.males));

  data.name = !isEmpty(data.name) ? data.name : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.males = !isEmpty(data.males) ? data.males : '';
  data.females = !isEmpty(data.females) ? data.females : '';

  if(Validator.isEmpty(data.name)) {
    errors.roomName = 'Name field is Required for room';
  }

  if(Validator.isEmpty(data.description)) {
    errors.roomDescription = 'Description field is required for room';
  }

  if(Array.isArray(data.males) == false) {
    errors.roomMales = "Keys must be an array"
  }

  if(Array.isArray(data.females) == false) {
    errors.roomFemales = "Values must be an array"
  }

  if(data.males.length != data.females.length) {
    errors.males = "Keys and Values length must be equal";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}