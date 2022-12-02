import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { useId } from 'react';

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
						<label className='form-label' htmlFor={id}>
							{label}
						</label>
					) : null}
					<Select
						id={id}
						options={options}
						value={options.find((option) => option.value === value)}
						onChange={(val) => {
							onChange(val.value);
						}}
						{...restField}
					/>
				</>
			)}
		/>
	);
};

SelectOptions.propTypes = {};

export default SelectOptions;
