import React from 'react';

const useMounted = (callback = () => {}, cleanup = () => {}, deps = []) => {
	const isMountedRef = React.useRef(true);
	const isMounted = React.useCallback(() => isMountedRef.current, []);

	React.useEffect(() => {
		return () => void (isMountedRef.current = false);
	}, []);

	return isMounted;
};

export default useMounted;
