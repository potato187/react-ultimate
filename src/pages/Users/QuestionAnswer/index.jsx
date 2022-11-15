import {useId} from "react";
import style from './style.module.scss';

const QuestionAnswer = ({
                        id,
                        description,
                        isSelected,
                        correctAnswers = {},
                        showCorrectAnswers = false,
                        onChange = null,
                        ...props
                    }) => {
    const uuid = useId();
    const handleOnChange = (e) => {
        if (onChange) {
            onChange(id, e.target.checked);
        }
    };

    let isCorrectAnswer = false;
    let classes = `form-check ${style['form-check']} `;

    if (showCorrectAnswers && correctAnswers.systemAnswers) {
        isCorrectAnswer = correctAnswers.systemAnswers.some(answer => answer.id === id);
        classes += isCorrectAnswer ? style['is-correct'] : style['is-wrong'];
    }

    return (
        <div className={classes} {...props}>
            <input id={uuid} type='checkbox' className='form-check-input' defaultChecked={isSelected}
                   onChange={handleOnChange}/>
            <label htmlFor={uuid} className='form-check-label'>{description}</label>
        </div>
    );
}

export default QuestionAnswer;