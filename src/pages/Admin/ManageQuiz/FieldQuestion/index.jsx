import { ErrorMessage } from '@hookform/error-message';
import InputField from '@pages/Admin/components/InputField';
import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AiOutlineDelete, AiOutlineFolderView, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import FieldAnswers from './FieldAnswers';
import style from './style.module.scss';

const FieldQuestion = ({ questionIndex, ...props }) => {
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
	const watchImage = watch(`question[${questionIndex}].questionImage`);
	const disabled = !!!watchImage;

	const handleRemoveQuestionImage = (index) => {
		setValue(`question[${index}].questionImage`, '');
	};

	return (
		<div className={style['field-question']}>
			<div className={style['field-question__title']}>Question {questionIndex + 1}: </div>
			<div className={style['field-question__header']}>
				<div className={`form-group ${style['form-group']}`}>
					<InputField name={`question[${questionIndex}].description`} placeholder='Enter Question' className='mb-0' />
				</div>
				<div className={style['field-question__action']}>
					<Controller
						control={control}
						name={`question[${questionIndex}].questionImage`}
						render={({ field }) => (
							<label className={style['btn-fill-image']}>
								<input
									hidden
									id={questionImageId}
									type='file'
									{...field}
									value={field.value.filename}
									onChange={(e) => field.onChange(e.target.files)}
								/>
								<BsFillImageFill size='1.25em' />
							</label>
						)}
					/>
					<button disabled={disabled} type='button' onClick={() => handleSetPreviewImage(watchImage)}>
						<AiOutlineFolderView size='1.25em' />
					</button>
					<button disabled={disabled} type='button' onClick={() => handleRemoveQuestionImage(questionIndex)}>
						<AiOutlineDelete size='1.25em' />
					</button>
					<button type='button' onClick={appendQuestion}>
						<AiOutlinePlusCircle size='1.25em' />
					</button>
					<button type='button' size='1.25em' onClick={() => removeQuestion(questionIndex)}>
						<AiOutlineMinusCircle size='1.25em' />
					</button>
					<ErrorMessage
						errors={errors}
						name={`question[${questionIndex}].questionImage`}
						render={({ message }) => <div className={style['invalid-message']}>{message}</div>}
					/>
				</div>
			</div>
			<div className={style['field-question__body']}>
				<FieldAnswers control={control} questionIndex={questionIndex} />
			</div>
		</div>
	);
};

export default FieldQuestion;
