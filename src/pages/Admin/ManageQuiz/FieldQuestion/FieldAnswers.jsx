import { ErrorMessage } from '@hookform/error-message';
import useInput from '@hooks/useInput';
import { useCallback, useId } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import style from './style.module.scss';

const FieldAnswers = ({ isDisabled = false, questionIndex }) => {
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
								<input
									id={checkboxId}
									type='checkbox'
									checked={field.value}
									className='form-checkbox'
									{...field}
									disabled={isDisabled}
								/>
							)}
						/>
					</div>
					<Controller
						control={control}
						name={`question[${questionIndex}].answers[${index}].description`}
						render={({ field }) => (
							<input
								id={descriptionId}
								className='form-control'
								placeholder='Enter answer'
								{...field}
								disabled={isDisabled}
							/>
						)}
					/>
					<div className={style['field-question__action']}>
						<button type='button' onClick={handleAddAnswer} disabled={isDisabled}>
							<AiOutlinePlusCircle size='1.25em' />
						</button>
						<button type='button' onClick={() => handleRemoveAnswer(index)} disabled={isDisabled}>
							<AiOutlineMinusCircle size='1.25em' />
						</button>
					</div>
					<ErrorMessage
						errors={errors}
						name={`question[${questionIndex}].answers[${index}].description`}
						render={({ message }) => (
							<div className={style['invalid-message']} style={{ left: '3rem' }}>
								{message}
							</div>
						)}
					/>
				</div>
			))}
		</>
	);
};

export default FieldAnswers;
