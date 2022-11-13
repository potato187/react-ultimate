import style from './style.module.scss';
import {uuid} from "@helpers/index.js";

const QuestionTableItem = () => {
    return
}

const QuestionTable = ({questions = [], currentIndex = 0, length = 0, handleSelect = null, ...props}) => {
    if (!length || length < 0) return <></>
    const handleOnClick = (index) => {
        handleSelect && handleSelect(index);
    }

    return (
        <div className={style['question-table']}>
            <div className={style['question-table__header']}>QUESTIONS</div>
            <ul className={style['question-list']} {...props}>
                {
                    Array(length).fill(null)
                        .map((_, index) => {
                            const  check = questions[index].answers.some(i => i.isSelected);
                            return (
                                <li key={uuid()} data-active={currentIndex === index} data-check={check} className={style['question-item']}
                                    onClick={() => handleOnClick(index)}>{index + 1}</li>)
                        })
                }
            </ul>
        </div>
    );
}

export default QuestionTable;