import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import useClickOutside from '@/hooks/useClickOutside';
import './style.scss';

const RenderOptions = ({ options, toggle, handleSelect, handleClose, ...props }) => {
	const nodeRef = React.useRef(null);

	const handleOnClick = (event) => {
		if (handleSelect) {
			const { id } = event.target.dataset;
			handleSelect(id);
			handleClose();
		}
	};

	return (
		<div className='select-dropdown'>
			<CSSTransition
				in={toggle}
				nodeRef={nodeRef}
				timeout={500}
				classNames='alert'
				className='select-dropdown__list'
				unmountOnExit>
				<ul className='list-unstyled mb-0 ' ref={nodeRef}>
					{options.map(({ key, value }) => (
						<li key={key} data-id={value} onClick={handleOnClick}>
							{value}
						</li>
					))}
				</ul>
			</CSSTransition>
		</div>
	);
};

const SelectField = ({ options = [], control, name, label, handleSetValue, ...props }) => {
	const id = React.useId();

	const [toggle, setToggle] = React.useState(false);

	const handleClose = () => {
		setToggle(false);
	};
	const handleSelect = (newValue) => {
		handleSetValue(name, newValue);
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, formState: { errors } }) => {
				const nodeRef = React.useRef(null);
				useClickOutside(nodeRef, () => {
					setToggle(false);
				});

				return (
					<Form.Group className='form-group select-group' controlId={id}>
						<Form.Label>{label}</Form.Label>
						<div ref={nodeRef}>
							<Form.Control hidden {...field} />
							<div
								className={['form-control', `${toggle ? 'focus' : ''}`].join(' ')}
								onClick={() => setToggle((prevState) => !prevState)}>
								{field.value ? field.value : props.placeholder}
							</div>
							<RenderOptions toggle={toggle} options={options} handleSelect={handleSelect} handleClose={handleClose} />
						</div>
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

export default SelectField;
