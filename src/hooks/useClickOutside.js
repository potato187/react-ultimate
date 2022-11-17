import {useEffect} from 'react';

const useClickOutside = (nodeRef = null, handleClickOutside) => {


    const eventClickOutSide = (event) => {
        if (nodeRef.current && !nodeRef.current.contains(event.target)) {
            handleClickOutside();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', eventClickOutSide);
        return () => {
            document.removeEventListener('mousedown', eventClickOutSide);
        };
    }, []);
};

export default useClickOutside;
