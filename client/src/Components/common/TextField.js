import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextField = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => {

  return (
    <div className="form-group">
      <input
        type={type}
        className={
          classnames('form-control form-control-lg', {
            'is-invalid': error
          })
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <small className="invalid-feedback">{error}</small>}
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField;