import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import style from './style.module.scss';

const CustomField = ({ control, name, label, errors, ...props }) => {
	const id = React.useId();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, formState: { errors } }) => {
				return (
					<Form.Group className={style['form-group']} controlId={id}>
						<Form.Label className={style['form-label']}>{label}</Form.Label>
						<Form.Control className={style['form-control']} {...field} {...props} />
						<ErrorMessage
							errors={errors}
							name={name}
							render={({ message }) => <div className={style['invalid-message']}>{message}</div>}
						/>
					</Form.Group>
				);
			}}
		/>
	);
};

export default CustomField;
