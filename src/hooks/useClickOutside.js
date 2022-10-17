import React from 'react';
import useMounted from './useMounted';

const useClickOutside = (nodeRef = null, handleClickOutside) => {
	const isMounted = useMounted();
	const eventClickOutSide = (event) => {
		if (nodeRef.current && !nodeRef.current.contains(event.target)) {
			handleClickOutside();
		}
	};

	React.useEffect(() => {
		if (isMounted()) {
			document.addEventListener('click', eventClickOutSide);
		}

		return () => {
			document.removeEventListener('click', eventClickOutSide);
		};
	}, []);
};

export default useClickOutside;
