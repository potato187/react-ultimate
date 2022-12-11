import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { useId } from 'react';

const styles = {
	control: (styles, state) => ({
		...styles,
		backgroundColor: 'white',
		boxShadow: 'none',
		minHeight: '35px',
	}),
};

const SelectOptions = ({ name, options = [], label = '', ...props }) => {
	const { control, formState = { errors } } = useFormContext();

	const id = useId();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange, ...restField } }) => (
				<>
					{label ? (
						<label className='form-label fw-bold mb-1' htmlFor={id}>
							{label}
						</label>
					) : null}
					<Select
						id={id}
						options={options}
						value={options.find((option) => option.value === value.toString().toLowerCase())}
						onChange={(val) => {
							onChange(val.value);
						}}
						styles={styles}
						{...restField}
						{...props}
					/>
				</>
			)}
		/>
	);
};

SelectOptions.propTypes = {};

export default SelectOptions;
