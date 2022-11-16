import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Form} from 'react-bootstrap';
import {Controller} from 'react-hook-form';
import style from './style.module.scss';
import {trimClassNames} from "@helpers";

const CustomField = ({control, name, label, errors, className ='', ...props}) => {
    const id = React.useId();
    const classes = trimClassNames(['form-group', style['form-group'], className])

    return (
        <Controller
            control={control}
            name={name}
            render={({field, formState: {errors}}) => {
                return (
                    <Form.Group className={classes} controlId={id}>
                        <Form.Label className={`form-label ${style['form-label']}`}>{label}</Form.Label>
                        <Form.Control className={`form-control ${style['form-control']}`} {...field} {...props} />
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({message}) => <div className={`invalid-message ${style['invalid-message']}`}>{message}</div>}
                        />
                    </Form.Group>
                );
            }}
        />
    );
};

export default CustomField;
