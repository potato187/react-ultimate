import { ErrorMessage } from '@hookform/error-message';
import InputField from '@pages/Admin/components/InputField';
import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AiOutlineDelete, AiOutlineFolderView, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import FieldAnswers from './FieldAnswers';
import style from './style.module.scss';

const FieldQuestion = ({ isDisabled = false, questionIndex, ...props }) => {
	const {
		control,
		handleSetPreviewImage,
		appendQuestion,
		removeQuestion,
		watch,
		setValue,
		formState: { errors },
	} = useFormContext();

	const descriptionId = useId();
	const questionImageId = useId();
	const watchImage = watch(`question[${questionIndex}].imageFile`);
	const disabled = !!!watchImage;

	const handleRemoveQuestionImage = (index) => {
		setValue(`question[${index}].imageFile`, '');
	};

	return (
		<div className={style['field-question']}>
			<div className={style['field-question__title']}>Question {questionIndex + 1}: </div>
			<div className={style['field-question__header']}>
				<div className={`form-group ${style['form-group']}`}>
					<InputField
						name={`question[${questionIndex}].description`}
						placeholder='Enter Question'
						className='mb-0'
						disabled={isDisabled}
					/>
				</div>
				<div className={style['field-question__action']}>
					<Controller
						control={control}
						name={`question[${questionIndex}].imageFile`}
						render={({ field }) => {
							return (
								<label className={style['btn-fill-image']}>
									<input
										hidden
										id={questionImageId}
										type='file'
										{...field}
										value={field.value?.filename}
										onChange={(e) => field.onChange(e.target.files)}
										disabled={isDisabled}
									/>
									<BsFillImageFill size='1.25em' />
								</label>
							);
						}}
					/>
					<button disabled={disabled} type='button' onClick={() => handleSetPreviewImage(watchImage)}>
						<AiOutlineFolderView size='1.25em' />
					</button>
					<button
						disabled={disabled}
						type='button'
						onClick={() => handleRemoveQuestionImage(questionIndex)}
						disabled={isDisabled}>
						<AiOutlineDelete size='1.25em' />
					</button>
					<button type='button' onClick={appendQuestion} disabled={isDisabled}>
						<AiOutlinePlusCircle size='1.25em' />
					</button>
					<button type='button' size='1.25em' onClick={() => removeQuestion(questionIndex)} disabled={isDisabled}>
						<AiOutlineMinusCircle size='1.25em' />
					</button>
					<ErrorMessage
						errors={errors}
						name={`question[${questionIndex}].imageFile`}
						render={({ message }) => (
							<div className={style['invalid-message']} style={{ bottom: '-1.25rem' }}>
								{message}
							</div>
						)}
					/>
				</div>
			</div>
			<div className={style['field-question__body']}>
				<FieldAnswers control={control} questionIndex={questionIndex} isDisabled={isDisabled} />
			</div>
		</div>
	);
};

export default FieldQuestion;
