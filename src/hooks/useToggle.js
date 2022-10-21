import React from 'react';
const useToggle = (initialState = false) => {
	const [toggle, setToggle] = React.useState(initialState);

	const handleOpen = () => {
		setToggle(true);
	};

	const handleClose = () => {
		setToggle(false);
	};

	return { toggle, handleToggle: setToggle, handleClose, handleOpen };
};

export default useToggle;
