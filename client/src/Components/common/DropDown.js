import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DropDown = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  disabled
}) => {

  let contents;
  if(disabled) {

    //If already responded disable the dropdown
    info = "Refresh to Edit Response"
    contents = <input 
      type='text'
      className={
          classnames('form-control form-control-lg')
      }
      placeholder={value}
      disabled />
  } else {

    //Show dropDown for user Response
    let selectOptions = options.map((option) =>(
      <option key={option} value={option}>
        {option}
      </option>
    ));
    let zero = "* SelectAValue";
    selectOptions = [<option label={zero} value={0}>{zero}</option>,...selectOptions];

    contents = <select
      className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
      name={name}
      value={value}
      onChange={onChange} 
      disabled={disabled}>
        {selectOptions}
    </select>
  }
  
  
  
  return (
    <div className="form-group">
    {contents}
    {info && <small className="form-text text-muted">{info}</small>}
    {error && (<div className="invalid-feedback">{error}</div>)}
  </div>

  )
}

DropDown.propTypes ={
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}


export default DropDown;