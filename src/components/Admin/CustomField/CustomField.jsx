import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './style.scss';

const CustomField = ({ control, name, label, errors, ...props }) => {
	const id = React.useId();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, formState: { errors } }) => {
				return (
					<Form.Group className='form-group' controlId={id}>
						<Form.Label>{label}</Form.Label>
						<Form.Control {...field} {...props} />
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ message }) => <div className='invalid-message'>{message}</div>}
						/>
					</Form.Group>
				);
			}}
		/>
	);
};

export default CustomField;
