import {useId} from "react";

const QuizAnswer = ({id, description, isSelected, onChange = null, ...props}) => {
    const uuid = useId();
    const handleOnChange = (e) => {
        if(onChange) {
            onChange(id, e.target.checked);
        }
    };

    return (<div className='form-check' {...props}>
        <input id={uuid} type='checkbox' name='' className='form-check-input' defaultChecked={isSelected} onChange={handleOnChange} />
        <label htmlFor={uuid} className='form-check-label'>{description}</label>
    </div>);
}

export default  QuizAnswer;