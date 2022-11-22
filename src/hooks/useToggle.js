import {useState, useCallback} from 'react';

const useToggle = (initialState = false) => {
    const [value, setValue] = useState(initialState);

    const toggle = useCallback(
        () => {
            setValue(prevState => !prevState);
        },
        [],
    );

    return [value, toggle];

};

export default useToggle;
