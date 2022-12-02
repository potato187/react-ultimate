import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';
import style from './style.module.scss';
import { trimClassNames } from '@helpers';

const InputField = ({ name, label = '', className = '', ...props }) => {
	const id = React.useId();
	const classes = trimClassNames(['form-group', style['form-group'], className]);
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<Form.Group controlId={id} className={classes}>
						{label ? <Form.Label className={`form-label ${style['form-label']}`}>{label}</Form.Label> : null}
						<input className={`form-control ${style['form-control']}`} {...props} {...field} />
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ message }) => <div className={`invalid-message ${style['invalid-message']}`}>{message}</div>}
						/>
					</Form.Group>
				);
			}}
		/>
	);
};

export default InputField;
