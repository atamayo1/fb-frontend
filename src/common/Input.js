import React from 'react';

function Input({label,type,placeholder,change,value,required,name}){
    return(
        <div className="control-group">
            <div className="form-group floating-label-form-group controls">
                <label>{label}</label>
                <input
                    name={name}
                    type={type}
                    onChange={change}
                    value={value}
                    className="form-control"
                    placeholder={placeholder}
                    required={required}/>
                <p className="help-block text-danger"/>
            </div>
        </div>
    );
};

export default Input;
