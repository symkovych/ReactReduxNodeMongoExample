import React, {Fragment} from 'react';
import {string, func} from 'prop-types'

export default function Input({value, title, onInputChange, type, error}) {
    return (
        <Fragment>
            <label>{title}</label>
            <br/>
            <input
                value={value}
                onChange={(e) => {
                    onInputChange(e.target.value);
                }}
                type={type}
                placeholder={title ? title.toLowerCase() : ''}
            />
            {error && <span style={{color: 'red'}}>{error}</span>}
        </Fragment>);
};

Input.propTypes = {
    value: string,
    title: string,
    error: string,
    type: string,
    onInputChange: func
};

Input.defaultProps = {
    type: 'text',
    error: ''
};