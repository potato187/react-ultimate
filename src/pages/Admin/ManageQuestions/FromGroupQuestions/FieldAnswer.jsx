import { ErrorMessage } from '@hookform/error-message';
import useInput from '@hooks/useInput';
import { useId } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import style from './style.module.scss';

const FieldAnswer = ({ questionIndex }) => {
	const descriptionId = useId();
	const checkboxId = useId();
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: `question[${questionIndex}].answers`,
	});

	const handleAddAnswer = () => {
		append({ description: '', isCorrect: false });
	};

	const handleRemoveAnswer = (index) => {
		remove(index);
	};

	return (
		<>
			{fields.map((_, index) => (
				<div key={index} className={style['field-question__answer']}>
					<div className='answer-checkbox d-flex justify-content-center align-items-center'>
						<Controller
							control={control}
							name={`question[${questionIndex}].answers[${index}].isCorrect`}
							render={({ field }) => (
								<input id={checkboxId} type='checkbox' checked={field.value} className='form-checkbox' {...field} />
							)}
						/>
					</div>
					<Controller
						control={control}
						name={`question[${questionIndex}].answers[${index}].description`}
						render={({ field }) => (
							<input id={descriptionId} className='form-control' placeholder='Enter answer' {...field} />
						)}
					/>
					<div className={style['field-question__action']}>
						<button type='button'>
							<AiOutlinePlusCircle size='1.25em' onClick={handleAddAnswer} />
						</button>
						<button type='button'>
							<AiOutlineMinusCircle size='1.25em' onClick={() => handleRemoveAnswer(index)} />
						</button>
					</div>
					<ErrorMessage
						errors={errors}
						name={`question[${questionIndex}].answers[${index}].description`}
						render={({ message }) => <div className={style['invalid-message']}>{message}</div>}
					/>
				</div>
			))}
		</>
	);
};

export default FieldAnswer;
