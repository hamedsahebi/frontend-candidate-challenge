import React from 'react';
import propTypes from 'prop-types';

const InputForm = (props) => {

    const{name,title,value,onChange,error,disabled,onSubmit,btnTitle} = props;

    return ( <div className="form-group">
    <label htmlFor={name}>{title}</label>
     <br />
     <input type="text" style={{width:150,margin:1}} 
     id={name} name={name} data-testid={name}
      value={value} 
      onChange={onChange} />
        {error && 
        <div className="alert alert-danger" style={{width:150,margin:1}} role="alert">
        {error}
        </div>
        }
        <br />
        <button onClick={onSubmit} name={btnTitle}
          disabled={disabled}
          data-testid={`btn-${name}`}
          className="btn-primary btn m-1">{btnTitle}
          
          </button> 
        </div> );
}

InputForm.propTypes={
  name:propTypes.string.isRequired,
  title:propTypes.string,
  value:propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  error:propTypes.string,
  disabled:propTypes.bool.isRequired,
  onSubmit:propTypes.func.isRequired,
  btnTitle:propTypes.string.isRequired
}
 
export default InputForm;
