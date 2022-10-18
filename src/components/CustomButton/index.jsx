import React from 'react';
import './style.scss';
import { trimClassNames } from '@/helpers';

function CustomButton({ title, isLoading = false, className = '', ...props }) {
	return (
		<button className={`${trimClassNames([`button ${isLoading ? 'is-loading' : ''}`, className])}`} {...props}>
			{isLoading && <span className='button-circle'></span>}
			<span className='button-title'>{title}</span>
		</button>
	);
}

export default CustomButton;
