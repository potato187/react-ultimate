import { useId } from 'react';
import { Controller } from 'react-hook-form';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import FieldAnswer from './FieldAnswer';
import style from './style.module.scss';

const FieldQuestion = ({ index, control, append, remove, ...props }) => {
	const descriptionId = useId();
	const questionImageId = useId();

	const appendFieldQuestion = () => {
		if (append) {
			append({ description: '', questionImage: '', answers: [{ description: '', isCorrect: false }] });
		}
	};

	const removeFieldQuestion = (index) => {
		if (remove) {
			remove(index);
		}
	};

	const appendFiledAnswer = (questionIndex) => {};

	return (
		<div className={style['field-question']}>
			<div className={style['field-question__title']}>Question {index + 1}: </div>
			<div className={style['field-question__header']}>
				<div className={`form-group ${style['form-group']}`}>
					<Controller
						control={control}
						name={`question[${index}].description`}
						render={({ field }) => <input id={descriptionId} className='form-control' {...field} />}
					/>
					<Controller
						control={control}
						name={`question[${index}].questionImage`}
						render={({ field }) => <input id={questionImageId} type='files' hidden {...field} />}
					/>
				</div>
				<div className={style['field-question__action']}>
					<button type='button'>
						<BsFillImageFill size='1.25em' />
					</button>
					<button type='button' onClick={appendFieldQuestion}>
						<AiOutlinePlusCircle size='1.25em' />
					</button>
					<button type='button' size='1.25em' onClick={() => removeFieldQuestion(index)}>
						<AiOutlineMinusCircle size='1.25em' />
					</button>
				</div>
			</div>
			<div className={style['field-question__body']}>
				<FieldAnswer control={control} questionIndex={index} />
			</div>
		</div>
	);
};

export default FieldQuestion;
