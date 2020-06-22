const Validator = require('validator');
const isEmpty = require('./is_empty');


module.exports = function validateProfileInput(data) {

  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle :'';

  data.company = !isEmpty(data.company) ? data.company : '';

  if(!Validator.isLength(data.handle, {min: 2, max: 20})) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if(Validator.isEmpty(data.company)) {
    errors.company = 'Company name is Required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}