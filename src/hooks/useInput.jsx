import { useState } from 'react';

const useInput = (initialValue = '') => {
	const [value, setValue] = useState(initialValue);
	const handleOnChange = (event) => {
		setValue(event.target.value);
	};
	return [value, handleOnChange];
};

export default useInput;
